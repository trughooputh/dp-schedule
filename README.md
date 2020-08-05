# Doctoralia Technical Test
Welcome to our technical test! :) Below you’ll have the instructions and some utils in order to be able to develop :)

### Exercise:
We are developing a small application for patients that have booked an appointment with a doctor through Doctoralia. This application would allow patients to reschedule their current appointment (reschedule the appointment) for another day and time.

You can check how it is in our production appointment by checking any appointment from the utils.txt.

However, you’ll have to mock the data of the current appointment (the one be rescheduled) and make different calls than in production to get the available slots and to book the appointment. Please, forget about the buttons ‘Confirm appointment’ and ‘Cancel appointment’, just ignore them. :)

Examples: 
*   Screenshot: https://monosnap.com/file/sc21Af4QRQ2hVL3xrXzyCV6kYvUNkJ
*   Video: https://monosnap.com/file/OEzPVaqq82v1M8Jrcy0qlSuAGDHUsu

*Utils:*
*   Slots (time and date of the visit) can be taken, what it means that a visit has already booked for that slot and is not available to the patient to book it.
*   You shouldn't be able to navigate/go to the past in the calendar
*   The first day that it is displayed in the calendar is the current day, so if today is Tuesday, the calendar we’ll start on Tuesday


#### Api:
- Url: `https://draliatest.azurewebsites.net/api/availability`

- Call to get the slots:
	`GET https://draliatest.azurewebsites.net/api/availability/GetWeeklySlots/{yyyyMMdd}`

- Call to book a slot:
	`POST https://draliatest.azurewebsites.net/api/availability/BookSlot`

Example payload for booking a slot to reschedule an appointment:
```
{        
            "Start": Start timestamp (string "YYYY-MM-dd HH:mm:ss"),
            "End": End timestamp (string "YYYY-MM-dd HH:mm:ss"),
            "Comments": Additional instructions for the doctor (string),
            "Patient" : {
                "Name" : Patient Name (string),
                "SecondName" : Patient SecondName (string),
                "Email" :  Patient Email (string),
                "Phone" : Patient Phone (string)
            }
}   
```

#### Feedback to the user 
The part where the user check if the appointment has been correctly rescheduled or not (screenshots below).

*Feedback examples:*
- https://monosnap.com/file/QOlAOSaTG61oZ9EfniKs9gOhCPEurB
- https://monosnap.com/file/593294FnzPK1Okwjt5rcT4txrLWNvg

### Nice to have:
* If the user leaves the process in the middle of rescheduling the appointment, whenever he comes back he should be in the same step with modal opened and the proper date selected.

---

### API calls examples: 

`GET https://draliatest.azurewebsites.net/api/availability/GetWeeklySlots/20170612`

Response:
```
{                  
            [
                {
                    "Start":"2017-06-13T10:00:00",
                    "End":"2017-06-13T11:00:00"
                },
                {
                    "Start":"2017-06-13T11:00:00",
                    "End":"2017-06-13T12:00:00"
                },
                {
                    "Start":"2017-06-13T12:00:00",
                    "End":"2017-06-13T13:00:00"
                },
                {
                    "Start":"2017-06-13T17:00:00",
                    "End":"2017-06-13T18:00:00"
                },
                {
                    "Start":"2017-06-13T18:00:00",
                    "End":"2017-06-13T19:00:00"
                },
                {
                    "Start":"2017-06-15T12:00:00",
                    "End":"2017-06-15T13:00:00"
                },
                {
                    "Start":"2017-06-15T13:00:00",
                    "End":"2017-06-15T14:00:00"
                }
            ]        
}
```



`POST https://draliatest.azurewebsites.net/api/availability/BookSlot`

Payload:
```
{                        
            "Start":"2017-06-13 11:00:00",
            "End":"2017-06-13 12:00:00",
            "Patient" : {
                "Name" : "Mario",
                "SecondName" : "Neta",
                "Email" : "mario@myspace.es",
                "Phone" : "555 44 33 22"
            },
            "Comments":"my arm hurts a lot"
}  
```


Any doubt, let us know! :)



