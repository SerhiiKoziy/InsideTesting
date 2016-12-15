### TEACHER


#GET /webapi/test/getLessonTests
````
in: 
    lessonId
out:
    [{
        id = z.Test.Id,
        title = z.Test.Title,
        status = "idle" "active" "complete"
    }]
````


# POST /webapi/lesson/setLessonStep 

````
in:
    lessonId, step (available values:
			Name,
            City,
            Shop,
            Phone,
            Address,
            Company,
            Position,
            SamsungPlusLogin,
            Lesson)
out:
    {  } 
````


# POST /webapi/test/startTest

````
in:
    lessonId,testId
out:
    { id } - id of lessonTest
````

# POST /webapi/test/endTest

````
in:
    lessonId,testId
out:
    {}
````


# GET /webapi/lesson/getLessonDashboard

````
in:
    lessonId
out:
    [{
        user = new
        {
            uid = z.UID,
            name = z.User?.Name,
            profileComplete = z.ProfileUpdated != null
        },
        tests = [{
            testId,
            answers : [ordered array of true|false|null]
        }]
    }]
````



