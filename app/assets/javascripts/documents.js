
	var Embed = Quill.import('blots/embed');

/*	$(document).ready(function() {
	   	initDelta = {"ops":
			[
				{"insert":"Procedimiento de control de documentos "},
				{"insert":{"TemplateMarker":{"marker":"[doc_1]","title":"DOC-001"}}},
				{"insert":" es responsabilidad de "},
				{"insert":{"TemplateMarker":{"marker":"[res_3]","title":"RES-003"}}},
				{"insert":" y genera el registro "},
				{"insert":{"TemplateMarker":{"marker":"[rec_2]","title":"REG-002"}}},
				{"insert":".\n"}
			]};
		quill.setContents(initDelta);
	});
*/
	class TemplateMarker extends Embed {
	    static create(value) {
	        let node = super.create(value);
	        //Set up the badge, and badge colour
	        switch(value.marker.substr(1, 3)) {
	        	case 'doc':
			        node.setAttribute('class', 'btn btn-xs btn-info');
	        		break;
	        	case 'rec':
			        node.setAttribute('class', 'btn btn-xs btn-warning');
	        		break;
	        	case 'res':
			        node.setAttribute('class', 'btn btn-xs btn-success');
			        break;
			    default:
			        node.setAttribute('class', 'btn btn-xs btn-danger');
		    }
	        node.setAttribute('data-marker', value.marker);

	        //The marker is the $ rel_table[id] reference
	        node.setAttribute('data-title', value.title);
	        //
	        node.innerHTML = value.title;
	        //The title is what the user sees in their editor
	        return node;
	    }
		static value(node) {
	        return {
	            marker: node.getAttribute('data-marker'),
	            title: node.getAttribute('data-title'),
	        };
	    }
	}
	TemplateMarker.blotName = 'TemplateMarker';
	TemplateMarker.tagName = 'span';
	Quill.register({
	    'formats/TemplateMarker': TemplateMarker
	});

	var toolbarOptions = [
		['bold', 'italic', 'underline', 'strike'], 
		[{ 'header': 1 }, { 'header': 2 }], 
		[{ 'list': 'ordered'}, { 'list': 'bullet' }],
		[{ 'indent': '-1'}, { 'indent': '+1' }],
	];
/*	var toolbarOptions = [
	  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
	  ['blockquote', 'code-block'],

	  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
	  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
	  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
	  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
	  [{ 'direction': 'rtl' }],                         // text direction

	  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
	  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

	  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
	  [{ 'font': [] }],
	  [{ 'align': [] }],

	  ['clean']                                         // remove formatting button
	];*/

	var options = {
	  modules: {
	    toolbar: toolbarOptions
	  },
	  placeholder: 'Procedure details...',
	  theme: 'snow'
	};

	var quill = new Quill('#editor', options);

	$('.ql-insertRef').on('change', function() {
		let range = quill.getSelection(true);
		quill.insertEmbed(
		    range.index,
		    //Insert the TemplateMarker in the same range as the cursor is
		    'TemplateMarker',
		    //This is the name of the Embed
		    {
				//colour: $(this).find(':selected').data('colour'),
				marker: $(this).find(':selected').data('marker'),
				title: $(this).find(':selected').data('title')
			},
			//These are the variables to enter
		);
		quill.insertText(range.index + 1, ' ', Quill.sources.USER);
		//Add a space after the marker
		quill.setSelection(range.index + 2, Quill.sources.SILENT);
		//Take the cursor to the end of the inserted TemplateMarker
		$(this).val("");
		//Reset the dropdown
	});
