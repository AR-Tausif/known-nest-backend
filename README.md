# L2-assignment-03

## Prerequisites

If you want to clone this repository and try to setup this project locally, ensure you have met the following requirements:

- Node.js installed
- TypeScript
- MongoDB installed

## 🔗 Live deployment link

[![live link](https://img.shields.io/badge/Live_Link-0A66C2?style=for-the-badge&logo=ko-fi&logoColor=white)](https://l2b2a3-course-review-roan.vercel.app/)

## Installation

1. **Clone the repository:**

   ```bash
   https://github.com/Porgramming-Hero-web-course/l2b2a3-course-review-AR-Tausif.git
   cd mongosh-crud
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Usage

Start the application:

```bash
npm run start:dev
```

## API Endpoints:

#### Create a Course

```http
  POST /api/course
```

#### Get Paginated and Filtered Courses

```http
  GET /api/courses
```

#### Create a Category

```http
  POST /api/categories
```

#### Get all Categories

```http
  GET /api/categories
```

#### Create a Review

```http
  POST /api/reviews
```

#### Update a Course (Partial\*)

```http
  PUT /api/courses/:courseId
```

#### Get Course by ID with Reviews\*

```http
  GET /api/courses/:courseId/reviews
```

#### Get the Best Course

```http
  GET /api/course/best
```

I you try Examples then you'll get truly response from backend and will get data from database with hit these url.

Thank you so much for visit...
