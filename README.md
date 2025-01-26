# Jobby App

### Videos:

<div style="text-align: center;">
  <video style="max-width:80%;box-shadow:0 2.8px 2.2px rgba(0, 0, 0, 0.12);outline:none;" loop="true" autoplay="autoplay" controls="controls" muted>
    <source src="https://assets.ccbp.in/frontend/content/react-js/jobby-app-success-output-v0.mp4" type="video/mp4">
  </video>
</div>
<br/>

**Failure View** <br/>

<div style="text-align: center;">
  <video style="max-width:80%;box-shadow:0 2.8px 2.2px rgba(0, 0, 0, 0.12);outline:none;" loop="true" autoplay="autoplay" controls="controls" muted>
    <source src="https://assets.ccbp.in/frontend/content/react-js/jobby-app-failure-output-v1.mp4" type="video/mp4">
  </video>
</div>
<br/>

### Design Files

<details>
<summary>Login Route</summary>

- [Extra Small (Size < 576px) and Small (Size >= 576px) - Login](https://assets.ccbp.in/frontend/content/react-js/jobby-app-login-sm-outputs.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Login](https://assets.ccbp.in/frontend/content/react-js/jobby-app-login-lg-output.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Login Failure](https://assets.ccbp.in/frontend/content/react-js/jobby-app-login-failure-lg-output.png)
</details>

<details>
<summary>Home Route</summary>

- [Extra Small (Size < 576px) and Small (Size >= 576px) - Home](https://assets.ccbp.in/frontend/content/react-js/jobby-app-home-sm-output.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Home](https://assets.ccbp.in/frontend/content/react-js/jobby-app-home-lg-output.png)
</details>

<details>
<summary>Jobs Route</summary>

- [Extra Small (Size < 576px) and Small (Size >= 576px) - Jobs](https://assets.ccbp.in/frontend/content/react-js/jobby-app-jobs-sm-outputs.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Jobs Success](https://assets.ccbp.in/frontend/content/react-js/jobby-app-jobs-success-lg-output-v0.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - No Jobs](https://assets.ccbp.in/frontend/content/react-js/jobby-app-no-jobs-lg-output-v0.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Profile Failure](https://assets.ccbp.in/frontend/content/react-js/jooby-app-profile-failure-lg-output-v0.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Jobs Failure](https://assets.ccbp.in/frontend/content/react-js/jobby-app-jobs-failure-lg-output-v0.png)
</details>

<details>
<summary>Job Item Details Route</summary>

- [Extra Small (Size < 576px) and Small (Size >= 576px) - Job Details Success](https://assets.ccbp.in/frontend/content/react-js/jobby-app-job-details-success-sm-output-v0.png)
- [Extra Small (Size < 576px) and Small (Size >= 576px) - Job Details Failure](https://assets.ccbp.in/frontend/content/react-js/jobby-app-job-details-failure-sm-output.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Job Details Success](https://assets.ccbp.in/frontend/content/react-js/jobby-app-job-details-success-lg-output-v0.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Job Details Failure](https://assets.ccbp.in/frontend/content/react-js/jobby-app-job-details-failure-lg-output.png)
</details>

<details>
<summary>Not Found Route</summary>

- [Extra Small (Size < 576px) and Small (Size >= 576px) - Not Found](https://assets.ccbp.in/frontend/content/react-js/jobby-app-not-found-sm-output-v0.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Not Found](https://assets.ccbp.in/frontend/content/react-js/jobby-app-not-found-lg-output-v0.png)
</details>

### Set Up Instructions

<details>
<summary>Click to view</summary>

- Download dependencies by running `npm install`
- Start up the app using `npm start`
</details>

### Completion Instructions

<details>
<summary>Functionality added</summary>
<br/>

# App Functionalities

## **Login Route**

- Invalid credentials:
  - Display the error message received from the response.
- Valid credentials:
  - Navigate to the **Home Route**.
- Unauthenticated user:
  - Redirect to the **Login Route** when accessing **Home**, **Jobs**, or **Job Item Details** routes.
- Authenticated user:
  - Access **Home**, **Jobs**, or **Job Item Details** routes directly.
  - Redirect to the **Home Route** when accessing the **Login Route**.

---

## **Home Route**

- Authenticated user:
  - Clicking the **Find Jobs** button navigates to the **Jobs Route**.

---

## **Jobs Route**

- When accessed by an authenticated user:
  - **Profile API Request:**
    - Display a loader while fetching.
    - Display response data upon success.
    - On failure:
      - Show the failure view.
      - Retry button triggers a new request.
  - **Jobs API Request**:
    - Fetch with `employment_type`, `minimum_package`, and `search` as query parameters (default empty strings).
    - Display a loader while fetching.
    - Display the list of jobs upon success.
    - On failure:
      - Show the failure view.
      - Retry button triggers a new request.
    - Handle search input:
      - Perform a GET request to **Jobs API URL** with the `search` query.
      - Update job list upon success.
    - Handle **Employment Types** selection:
      - Fetch jobs using `employment_type` as a single comma-separated string.
      - Update job list upon success.
    - Handle **Salary Range** selection:
      - Fetch jobs using `minimum_package` as the selected salary range.
      - Update job list upon success.
    - Empty job list:
      - Show the **No Jobs View**.
    - Combine multiple filters:
      - Apply all filters and fetch jobs accordingly.
    - Clicking on a job navigates to the **Job Item Details Route**.

---

## **Job Item Details Route**

- When accessed by an authenticated user:
  - **Job Details API Request**:
    - Display a loader while fetching.
    - Show response data, including similar jobs, upon success.
    - On failure:
      - Show the failure view.
      - Retry button triggers a new request.
  - **Visit** button opens the company website URL in a new tab.

---

## **Not Found Route**

- Invalid paths redirect to the **Not Found Route**.

---

## **Header**

- Website logo:
  - Navigates to the **Home Route**.
- **Home** link:
  - Navigates to the **Home Route**.
- **Jobs** link:
  - Navigates to the **Jobs Route**.
- **Logout** button:
  - Navigates to the **Login Route**.

---

## **Data Structures**

### `employmentTypesList`
- Contains a list of employment types:
  - **Key**: `employmentTypeId` (String)
  - **Key**: `label` (String)

### `salaryRangesList`
- Contains a list of salary ranges:
  - **Key**: `salaryRangeId` (String)
  - **Key**: `label` (String)

---

## **API Requests & Responses**

### **Login API**

- **URL**: `https://apis.ccbp.in/login`
- **Method**: `POST`
- **Request**:

```json
{
  "username": "rahul",
  "password": "rahul@2021"
}
```

#### Description:

Returns a response based on the credentials provided

#### Sample Success Response

```json
{
  "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9. nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y"
}
```

#### Sample Failure Response

```json
{
  "status_code": 404,
  "error_msg": "Username is not found"
}
```

**Profile API**

#### API: `https://apis.ccbp.in/profile`

#### Method: `GET`

#### Description:

Returns a response containing the profile details

#### Sample Response

```json
{
  "profile_details": {
    "name": "Rahul Attuluri",
    "profile_image_url": "https://assets.ccbp.in/frontend/react-js/male-avatar-img.png",
    "short_bio": "Lead Software Developer and AI-ML expert"
  }
}
```

**Jobs API**

#### API: `https://apis.ccbp.in/jobs`

#### Example: `https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search=`

#### Method: `GET`

#### Description:

Returns a response containing the list of all jobs

#### Sample Response

```json
{
  "jobs": [
    {
      "company_logo_url": "https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png",
      "employment_type": "Full Time",
      "id": "d6019453-f864-4a2f-8230-6a9642a59466",
      "job_description": "We’re in search of a Back-End Software Engineer that specializes in server-side components. In this role, you’ll primarily work in NodeJs, SQL Lite, Python, AWS and GO and will bring a depth of knowledge on basic algorithms and data structures. As a Back-End Engineer, you might be architecting new features for our customers.",
      "location": "Bangalore",
      "package_per_annum": "21 LPA",
      "rating": 4,
      "title": "Backend Engineer"
    }
    ...
  ],
  "total":25,
}
```

**Job Details API**

#### API: `https://apis.ccbp.in/jobs/:id`

#### Example: `https://apis.ccbp.in/jobs/bb95e51b-b1b2-4d97-bee4-1d5ec2b96751`

#### Method: `GET`

#### Description:

Returns a response containing the job details

#### Sample Response

```json
{
  "job_details": {
    "company_logo_url": "https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png",
    "company_website_url": "https://about.netflix.com/en",
    "employment_type": "Internship",
    "id": "bb95e51b-b1b2-4d97-bee4-1d5ec2b96751",
    "job_description": "We are looking for a DevOps Engineer with a minimum of 5 years of industry experience, preferably working in the financial IT community. The position in the team is focused on delivering exceptional services to both BU and Dev",
    "skills": [
      {
        "image_url": "https://assets.ccbp.in/frontend/react-js/jobby-app/docker-img.png",
        "name": "Docker"
      },
      ...
    ],
    "life_at_company": {
      "description": "Our core philosophy is people over process. Our culture has been instrumental to our success. It has helped us attract and retain stunning colleagues, making work here more satisfying. Entertainment, like friendship, is a fundamental human need, and it changes how we feel and gives us common ground. We want to entertain the world.",
      "image_url": "https://assets.ccbp.in/frontend/react-js/jobby-app/life-netflix-img.png"
    },
    "location":"Delhi",
    "package_per_annum":"10 LPA",
    "rating":4
  },
  "similar_jobs": [
    {
      "company_logo_url": "https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png",
      "employment_type": "Freelance",
      "id": "2b40029d-e5a5-48cc-84a6-b6e12d25625d",
      "job_description": "The Experimentation Platform team builds internal tools with a big impact across the company. We are looking to add a UI engineer to our team to continue to improve our experiment analysis workflow and tools. Ideal candidates will be excited by direct contact with our users, fast feedback, and quick iteration.",
      "location": "Delhi",
      "rating": 4,
      "title": "Frontend Engineer"
    },
    ...
  ]
}
```

</details>

### Quick Tips

<details>
<summary>Click to view</summary>
<br>

- To convert a list of items as a comma-separated string we can use the array method `join()`

</details>

### Important Note

<details>
<summary>Click to view</summary>

<br/>

- User credentials

  ```text
   username: rahul
   password: rahul@2021

  ```

  ```jsx
  <div className="loader-container" data-testid="loader">
    <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
  </div>
  ```

- **Jobs Route**

  ```jsx
  <button type="button" data-testid="searchButton">
    <BsSearch className="search-icon" />
  </button>
  ```

### Resources

<details>
<summary>Image URLs</summary>

- [https://assets.ccbp.in/frontend/react-js/home-sm-bg.png](https://assets.ccbp.in/frontend/react-js/home-sm-bg.png)
- [https://assets.ccbp.in/frontend/react-js/home-lg-bg.png](https://assets.ccbp.in/frontend/react-js/home-lg-bg.png)
- [https://assets.ccbp.in/frontend/react-js/profile-bg.png](https://assets.ccbp.in/frontend/react-js/profile-bg.png)
- [https://assets.ccbp.in/frontend/react-js/logo-img.png](https://assets.ccbp.in/frontend/react-js/logo-img.png) 
- [https://assets.ccbp.in/frontend/react-js/failure-img.png](https://assets.ccbp.in/frontend/react-js/failure-img.png) 
- [https://assets.ccbp.in/frontend/react-js/no-jobs-img.png](https://assets.ccbp.in/frontend/react-js/no-jobs-img.png) 
- [https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png](https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png)

</details>

<details>
<summary>Colors</summary>

<br/>
<div style="background-color: #64748b; width: 150px; padding: 10px; color: white">Hex: #64748b</div>
<div style="background-color: #4f46e5; width: 150px; padding: 10px; color: white">Hex: #4f46e5</div>
<div style="background-color: #f8fafc; width: 150px; padding: 10px; color: black">Hex: #f8fafc</div>
<div style="background-color: #272727; width: 150px; padding: 10px; color: white">Hex: #272727</div>
<div style="background-color: #ffffff; width: 150px; padding: 10px; color: black">Hex: #ffffff</div>
<div style="background-color: #b6c5ff; width: 150px; padding: 10px; color: black">Hex: #b6c5ff</div>
<div style="background-color: #6366f1; width: 150px; padding: 10px; color: white">Hex: #6366f1</div>
<div style="background-color: #2c364c; width: 150px; padding: 10px; color: white">Hex: #2c364c</div>
<div style="background-color: #000000; width: 150px; padding: 10px; color: white">Hex: #000000</div>
<div style="background-color: #f1f5f9; width: 150px; padding: 10px; color: black">Hex: #f1f5f9</div>
<div style="background-color: #fbbf24; width: 150px; padding: 10px; color: white">Hex: #fbbf24</div>
<div style="background-color: #202020; width: 150px; padding: 10px; color: white">Hex: #202020</div>
<div style="background-color: #cbd5e1; width: 150px; padding: 10px; color: black">Hex: #cbd5e1</div>
<div style="background-color: #7e858e; width: 150px; padding: 10px; color: black">Hex: #7e858e</div>
<div style="background-color: #121212; width: 150px; padding: 10px; color: white">Hex: #121212</div>
<div style="background-color: #475569; width: 150px; padding: 10px; color: white">Hex: #475569</div>
<div style="background-color: #ff0b37; width: 150px; padding: 10px; color: white">Hex: #ff0b37</div>
<br/>
</details>

<details>
<summary>Font-families</summary>

- Roboto
</details>
