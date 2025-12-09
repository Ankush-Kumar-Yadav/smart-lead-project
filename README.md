# Smart Lead Processing System

This project processes a batch of user names, enriches them using the Nationalize.io API, stores the data in MongoDB, and runs a scheduled cron job to simulate syncing verified leads to a CRM system.

---

## 🚀 Setup Instructions

### 1️⃣ Clone the project
```
git clone <your-repo-url>
cd smart-lead-project
```

### 2️⃣ Install Backend Dependencies
```
cd backend
npm install
```

### 3️⃣ Install Frontend Dependencies
```
cd frontend
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the **backend** folder:

```
PORT=4000
MONGO_URI= Please, use Mongodb locally the api is not working properly when connected to Mongodb Atlas
```

Example MongoDB Atlas URL:
```
mongodb+srv://username:password@cluster0.mongodb.net/smartleaddb?retryWrites=true&w=majority
```

---

## ▶️ Run the Project

### Start Backend
```
npm start
```

### Start Frontend
```
npm run dev
```

---

## 🏗 Architectural Explanation

### ✅ Batch API Requests (Optimized)
To fetch data from the **Nationalize API**, we use a custom async-pool function to process names in **parallel** but with a **limit of 5 at a time**.

Why?

- Prevents API overload  
- Avoids hitting rate limits  
- Much faster than sequential requests  
- Safer than sending 100+ requests at once  

Each batch returns:
- Top predicted country  
- Highest probability  
- Status (“Verified” or “To Check”)  

---

### 🔄 Background Task (Cron Job)

We use **node-cron** to run a scheduled task every 5 minutes.

This cron job:

1. Finds all leads where:
   - `status = "Verified"`
   - `synced = false`

2. Logs a CRM sync simulation:
```
[CRM Sync] Sending verified lead {name} to Sales Team...
```

3. Marks the lead as:
```
synced = true
```

### 🔒 Idempotency Guarantee
A lead is *never synced twice* because we mark it as `synced: true` after first sync.

That means:
- Even if cron runs 100 times  
- Even if server restarts  
- Even if list grows  

➡️ No duplicate syncs will happen.

---

## 🖼 Screenshot of Database Data

Example of documents stored in MongoDB:
 <img width="1890" height="778" alt="image" src="https://github.com/user-attachments/assets/faa3c158-4284-483a-bf8b-54b28269cb3d" />



## ✔ Summary

This project demonstrates:

- React (Vite) frontend  
- Express + Node backend  
- MongoDB Atlas database  
- Batch API handling  
- Cron-based background syncing  
- Idempotent task processing  
- Clean scalable architecture  

---

If you want, I can also:

✅ Generate a PDF version  
✅ Generate a DOCX version  
✅ ZIP the README (once the tool unlocks)  

Just tell me **what exact format you want next**.
