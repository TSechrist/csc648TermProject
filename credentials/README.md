# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP
<br>Website Url: www.gatortrader.ga
<br>Server Url: http://ec2-18-189-150-121.us-east-2.compute.amazonaws.com/

2. SSH username
<br><strong>ec2-user@ec2-18-189-150-121.us-east-2.compute.amazonaws.com</strong>

3. SSH password or key.
    <br> <strong>Key file is added to credentials folder</strong>
4. Database URL or IP and port used.
<br><strong> gatortrader.cdnacoov8a86.us-west-1.rds.amazonaws.com</strong>
5. Database username
<br><strong> admin</strong>
6. Database password
<br><strong> csc648_team10</strong>
7. Database name (basically the name that contains all your tables)
<br><strong>gatortrader</strong>
8. Instructions on how to use the above information.
<br>
<strong>(Note that you need to launch these commands in the directory that contains your .pem key file)</strong>
<br><strong>First make key file viewable by running this command </strong>

```
chmod 400 launchkey.pem
```

<br><strong>Then SSH into server:</strong>

```
ssh -i "launchkey.pem" ec2-user@ec2-18-189-150-121.us-east-2.compute.amazonaws.com
```

# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
