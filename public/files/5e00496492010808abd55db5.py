import smtplib
import ssl

port = 465  # For SSL
password = 'mufzed-xahSy1-muxqoq'
# Create a secure SSL context
context = ssl.create_default_context()

with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
    server.login("pve.kz.postman@gmail.com", password)
