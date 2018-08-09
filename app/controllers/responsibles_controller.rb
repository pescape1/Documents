class ResponsiblesController < ApplicationController
	def index
		@responsibles = Responsible.all
	end

	def new
		@responsible = Responsible.new
	end

	def create
		@responsible = Responsible.new(responsible_params)

		if @responsible.save
			redirect_to responsibles_path
		else
			render 'new'
		end
	end

	private
	def responsible_params
		params.require(:responsible).permit(:name)
	end
end
