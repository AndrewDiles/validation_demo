<h1 style="color: lime">Validation</h1>

---

<h3 style="color: magenta">The Handler Function</h3>

The logic of any function should be easy to follow.

This means some combination of comments, accurate variable and helper function names.

A validation function (handler) is no different.

---

Test each potential breach of valid data sequentially.

Ideally, the function does as little as possible.

So stop testing if there is invalid data, as you then know the response.

This often means a `return` command.

---

<h3 style="color: magenta">What to test?</h3>

The data is in the `req.body` object.

This object contains key value pairings.

Make sure that it has all the required keys.

Ensure the values of those keys are of the correct type.

Ensure the values of those keys are within contraints.

If the values contain nested arrays or objects, test their contents.

---

<h3 style="color: magenta">What to do if we find <span style="color:red">invalid</span> data?</h3>

Make a response, and end the handler function

---

<h3 style="color: magenta">What to do if all the data is <span style="color:lime">valid</span>?</h3>

Format the data into the shape you need.

Add it to your database (or write it to server files)

Respond with a confirmation

---

<h3 style="color: magenta">Improving code structure</h3>

A server may have many endpoints that repeat the same tests.

Sounds like we want DRY code.

We can create a `validation` helper function for any subset of validation tests.

A handler may look like the following:

```js
const handleLogIn = (req, res) => {
	const {email, password} = req.body;
	
	if (invalidEmail(email)) {
		return res.status(400).json({message: "bad email"})
	} else if (invalidPassword(password)) {
		return res.status(400).json({message: "bad password"})
	}

	const foundUser = users.find(user => user.email === email);

	if (!foundUser) {
		return res.status(404).json({message: "user not found"})
	} else if (foundUser.password !=== password) {
		return res.status(401).json({message: "wrong password"})
	}

	updateLastLogin(foundUser);
	res.status(200).json(foundUser)
}

```

You could keep re-factoring

```js
const handleLogIn = (req, res) => {
	const {email, password} = req.body;
	
	if (invalidEmail(email)) {
		return badEmail(res)
	} else if (invalidPassword(password)) {
		return badPassword(res)
	}

	const foundUser = findUser(email);

	if (!foundUser) {
		return user404(res)
	} else if (foundUser.password !=== password) {
		return wrongPassword(res)
	}

	updateLastLogin(foundUser);
	res.status(200).json(foundUser)
}

```

And again...
```js
const handleLogIn = (req, res) => {
	const invalid = testLogInValidity(req.body)

	if (invalid) return respondToInvalidData(invalid, res);

	const user = attemptLogIn(req.body);

	if (user.error) return respondToError(user.error, res);

	completeLogIn(user, res)
}

```

---

<h3 style="color: magenta">Some <span style="color:gold">golden</span> rules:</h3>

- The server is the last line of defense: maintain the sanitation of your data
- Assume the front end is useless
- Never dump the `req.body` into your database

---

<h3 style="color: magenta">Demo objective</h3>

Write a new endpoint that accepts the grades of a student.

The student should exist, and not yet be "graded".

`post` should accept a body of shape:
```
{
	"id" : [Number]
	"grades": [Array] of Numbers, length 4
}
```

Ensure it validates the incoming information.

Ensure the existing data structures are maintained.

Respond to the request according to the outcome.
