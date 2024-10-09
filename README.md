# Park Snap

Park Snap is a compact application for managing parking lots with multiple parking slots.

# How to run the Park Snap application

Now you can test the application.

## 1.  Clone git repo
https://github.com/rashmithachamikara/ParkSnap
Use git or download zip

## 2.  Open the parksnap_back folder with your Java IDE (eg: IntelliJ IDEA)

## 3.  Run (Start) MySQL database.

You don't have to create any database, everything will be automatically created.

## 4.  Change the following values in your application.properties file to match your database settings
(parksnap_back/src/resources/application.properties)

spring.datasource.url=jdbc:mysql://localhost:3306/parkSnap?createDatabaseIfNotExist=true

change localhost:3306 only if your database port is different (usually no need)

spring.datasource.username= Your mySQL username

spring.datasource.password= Your mySQL password

## 5.  Run the backend
You can run the app by running the ParkingApplication.java file from your Java IDE. Open the file then use your IDE's run option.
(src/main/java/com/example/parking/ParkingApplication.java)

Now, the backend should be running!

## 6.  Open the parksnap_front folder (with VsCode or CMD/terminal)
Run in npm run start command (in VsCode ctrl+` will open the terminal)

Now, the frontend will start and a browser window will open. The link will be displayed in the console. Make sure the frontend port is 3000. Otherwise, the backend won't authenticate!

## 7.  Login using test credentials

Test credentials for frontend:
username: adam
password: 123

Now, the frontend is ready!
