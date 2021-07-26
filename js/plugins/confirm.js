$.confirm = function(options) {
	return new Promise((resolve, reject) => {
		const modal = $.modal({
			title: options.title,
			closeble: true,
			width: '60%',
			content: options.content,
			onClose() {
				modal.destroy()
			},
			buttons: [
				{
					text: 'Cancel',
					type: 'secondary',
					handler() {
						modal.close()
						// reject()
					}
				},
				{
					text: 'Delete',
					type: 'danger',
					handler() {
						modal.close()
						resolve()
					}
				}
			]
		})
		setTimeout(() => modal.open(), 100)
	})
}