# team doingNow project title: Jerry   

Our solution is deployed to the cloud with the use of aws: EC2, S3 and DocumentDB.

This repo is not connected to the cloud and is just a respository of the codes

Back-end
location : ./back-end
Consist of two .py files. app.py and app_cloud9.py
- These two files serve the same purpose which is a flask app that hosts a REST API call for the front end to receive dynamic data
- app.py is to be used on EC2-ubuntu server
- app_cloud.py is to be used on EC2-cloud9 IDE server
-- We tested two alternative server options, hence we have two version of the code


Front-end
location : ./font-end
-The index file is home.html
-The front end connects to the back end via RESI API GET Call
-The font end system is built with HTML,CSS and JS
-- Front-end is current being tested on AWS s3, with future plans to run it on an EC2 running Node.js