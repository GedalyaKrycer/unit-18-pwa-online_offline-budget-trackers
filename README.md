# unit-18-pwa-online_offline-budget-trackers

[View Deployed App on Heroku]()

## Objective
The goal was to add indexDB and PWA capabilities to an existing app. These features allows the site to be operational (temporarily store data) when it goes offline and to be downloaded onto a computer/mobile device.

---

## Notes

* **db.js** in the **public** folder houses the indexDB logic. Most of this code was pulled from a previous project, so I have added additional descriptive notes to help learn the functionality.

* Because of indexDB the user's input is stored locally if the database connection is lost. Once the database comes back online, the local data resubmits to MongoDB and removes from indexDB. This allows for the application to be used even without a proper connection. 

* As a PWA, this site can be downloaded to the desktop or mobile device like a regular app. 