const fs = require('fs');
const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
const htmlPdf = require('html-pdf-chrome');
const Handlebars = require('handlebars');

const app = express()
const port = 80

app.use(express.json()) // for parsing application/json	

app.get('/', (req, res) => res.send('GT REPORT API SERVICE'));

app.post('/report', function (req, res) {

	if (typeof req.body.reportname !== "undefined")
	{	
		//joining path of directory 
		const directoryPath = path.join(__dirname, 'Templates');
		//passsing directoryPath and callback function
		fs.readdir(directoryPath, function (err, files) {
			//handling error
			if (err) {
				res.status(400).send('Unable to scan directory: ' + err);
			} 
			
			console.log(req.body);

			if (files.includes(req.body.reportname + ".hbs") === true) {
				const filePath = path.join(__dirname, 'Templates', req.body.reportname + '.hbs');
				var hbs_content = fs.readFileSync(filePath, 'utf8');

				// create pdf with default option
				Handlebars.registerHelper("numberFormat2", function (num) {
					return num.toFixed(2);
				});
				
				var html = Handlebars.compile(hbs_content)(req.body.data);

				var option = require('./Templates/' + req.body.reportname + '.js');

                htmlPdf.create(html, option)
                    .then(
                        (pdf) => {
                            pdf.toStream().pipe(res);
                        }
                    )
                    .catch(err => {
                        res.status(500).send("cannot create pdf err: " + err);
                    });
			} 
			else {
				res.status(404).send("Cannot find template name");
			}			
		});

	}
	else {
		res.status(404).send("Unknown Report Template name, please define reportname key in your json request");
	}
  });
  

app.listen(port, () => console.log(`Graftel Report Server listening at http://localhost:${port}`))