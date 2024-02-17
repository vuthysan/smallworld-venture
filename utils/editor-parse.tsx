export const getFirstParagraph = (content: any) => {
	var description = "";
	var firstDesc = false;
	content.blocks.map((block: any) => {
		if (!firstDesc) {
			switch (block.type) {
				case "paragraph":
					description = block.data.text.replace("<br>", "");
					firstDesc = true;
					break;
				default:
					break;
			}
		}
	});

	return description;
};

export const getThumbnail = (content: any) => {
	let thumnail;

	let firstThumb = false;
	content.blocks.map((block: any) => {
		if (!firstThumb) {
			switch (block.type) {
				case "image":
					thumnail = block?.data?.file?.url;
					firstThumb = true;
					break;

				case "simpleImage":
					thumnail = block?.data?.url;
					firstThumb = true;
					break;

				// default:
				//   console.log('Unknown block type', block.type)
				//   break
			}
		}
	});

	return thumnail;
};
