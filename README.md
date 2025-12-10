# ![App Logo](https://res.cloudinary.com/dq7qhhd0l/image/upload/v1764941872/tiap-main-logo_iftjew.png)

## **TIAP App – Warehouse Exception Management System (Frontend)**
### **[See the App](https://sequences-app.vercel.app)**

---

## **Description**

TIAP App is a modern React application built for the **Tracking, Inspection, and Analysis Platform (TIAP)**.  
It provides tools for warehouse exception logging, root cause tracking, and operational analytics through interactive dashboards.

Key functionalities include exception management, monthly statistics, root cause analysis, image upload, and role-based access control.

---

## **Technologies, Libraries & APIs Used**

### **Core**
- React  
- Vite

### **Routing & Data**
- React Router DOM  
- Axios

### **UI & Styling**
- Tailwind CSS

### **State Management**
- React Context API

### **Charts**
- Recharts

### **Other**
- Cloudinary  
- JavaScript FormData API  
- LocalStorage

---

## **Backlog Functionalities**
- Advanced search and filtering  
- Additional analytics  
- UI/UX improvements

---

# **Client Structure**

## **User Stories**

- **Dashboard** — Users can view system analytics, monthly statistics, and charts.  
- **View all exceptions** — Users can access a list of all exception logs.  
- **Create exception** — Admin users can log new exceptions with images and detailed fields.  
- **View detailed exception** — Users can see complete exception information.  
- **Edit or delete an exception** — Admin users can modify or remove existing logs.  
- **Manage root causes** — View, create, edit, or delete root causes (admin-only for modifications).  
- **Authentication** — Login, signup, and protected routes.  
- **Error views** — Custom pages for 401/404.

---

## **React Router Routes**

| Path | Page | Components | Behavior |
|------|------|------------|----------|
| `/` | Dashboard | — | View analytics overview |
| `/login` | Login | — | Login and redirect to dashboard |
| `/signup` | Signup | — | Create an account and redirect to login |
| `/logs` | ExceptionLogs | — | View all exception logs |
| `/logs/new` | CreateExceptionLog | — | Create a new exception (admin only) |
| `/logs/:_id` | ExceptionDetails | — | View detailed exception info |
| `/logs/:_id/edit` | EditException | — | Edit an exception (admin only) |
| `/root-causes` | RootCauses | — | View all root causes |
| `/root-causes/new` | CreateRootCause | — | Create new root cause (admin only) |
| `/root-causes/:_id` | RootCauseDetails | — | View root cause details |
| `/root-causes/:_id/edit` | EditRootCause | — | Edit root cause (admin only) |
| `/unauthorized` | Unauthorized | — | Unauthorized access page |
| `*` | NotFound | — | 404 page |

---

## **Client Components**

### **Components**
- ExceptionListFiltersBar.jsx  
- ExceptionListHeader.jsx  
- ExceptionListRow.jsx  
- MyFooter.jsx  
- MyNavbar.jsx  
- MyToast.jsx  
- RootCauseCard.jsx  
- SettingsMenu.jsx  
- Sidebar.jsx

### **Contexts**
- auth.context.jsx  
- toast.context.jsx

### **Pages**
- Dashboard.jsx  
- ExceptionLogs.jsx  
- CreateExceptionLog.jsx  
- ExceptionDetails.jsx  
- EditException.jsx  
- RootCauses.jsx  
- CreateRootCause.jsx  
- RootCauseDetails.jsx  
- EditRootCause.jsx  
- Profile.jsx  

### **Auth Pages**
- Login.jsx  
- Signup.jsx  

### **Error Pages**
- InternalServerError.jsx  
- NotFound.jsx  
- Unauthorized.jsx  

---

# **Links**

### **Slides**
[Slides Link](https://drive.google.com/file/d/17XfbTA0k-XnWR5mMsHag2n2y_nyqXMkR/view?usp=sharing)

### **Live App**
https://sequences-app.vercel.app

