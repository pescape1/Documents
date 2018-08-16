class DocumentsController < ApplicationController
	#http_basic_authenticate_with name: "admin", password: "admin"
	def index
		@documents = Document.all
	end

	def show
		@document = Document.find(params[:id])
	end

	def new
		@document = Document.new
		@categories = Category.all
		@documentReferences = Document.getDocumentReferences
		@recordReferences = Document.getRecordReferences
		@responsibles = Responsible.all
	end

	def create
		#render plain: params[:document].inspect
		#render plain: x
		@document = Document.new(document_params)

		if @document.save
			redirect_to documents_path
		else
			@categories = Category.all
			render 'new'
		end
	end

	def edit
		@categories = Category.all
		@document = Document.find(params[:id])
	end

	def update
	  @document = Document.find(params[:id])
	  @categories = Category.all
	 
	  if @document.update(document_params)
	    redirect_to documents_path
	  else
	    render 'edit'
	  end
	end

	def destroy
	  @document = Document.find(params[:id])
	  @document.destroy
	 
	  redirect_to documents_path
	end

	private
		def document_params
			params.require(:document).permit(:title, :content, :category_id)
		end
end
