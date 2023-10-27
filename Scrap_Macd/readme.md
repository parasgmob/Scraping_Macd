This Readme file is for Backend project.

In this project we have to scrap a website and send the scraped data in api response.

As It take longer time to scrap the whole website at once, we created a cronjob which runs at every 10 minute and scrap the data and store that scraped data in our Database.
and when frontend hit our api to get data we get it from DB for getting response Faster

- To Install the app we have to go through certain steps:

    - First we have to create a Virtual env for our project using
                    "python -m venv env"
    - Then activate that environment using 
                    "source env/bin/activate" - Note: run the command where env folder is created

    - After activating a virtual environment we have to install all the packages requirements using 
                    "pip install -r requirements.txt" - Note: run the command where requirements.txt is present

    - Then we have to add a cron using 
                    "python manage.py crontab add" so, that our data will start scraping in background.

    - Then we have to start our Backend server using 
                    "python manage.py runserver".

    - Now our Backend server is ready for work.

The Backend server will run on 
    "http://127.0.0.1:9000/" so free port 9000 for it
