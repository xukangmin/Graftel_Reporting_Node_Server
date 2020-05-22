module.exports = {
	port: 9222, // port Chrome is listening on
	printOptions: {
		landscape: true,
		printBackground: true,
		displayHeaderFooter: true,
		footerTemplate:  `
		<div class="text center">
		  Page <span class="pageNumber"></span> of <span class="totalPages"></span>
		</div>
	  `,
		marginTop : 0,
		marginBottom : 0.4,
		marginLeft: 0,
		marginRight: 0
	}
}