# Project Nexus: 2-Month Complete Project Per Team
## 4 Independent Teams, Each Builds Entire System
## 32 Students (8 per team), React + .NET Core Microservices

**Context:** 32 students, 4 teams (8 each), each team builds COMPLETE project, 2-month internship  
**Frontend:** React.js with TypeScript  
**Backend:** ASP.NET Core 8.0 microservices (C#)  
**Database:** PostgreSQL (each team has own instance)  
**Hosting:** Railway.app (manual deployment, no GitHub integration)  
**Meeting Structure:** 2 on-campus days/week + 5 days remote work  
**Date:** September-October 2026

---

## Table of Contents

1. [Team Organization & Project Structure](#team-organization--project-structure)
2. [Team Work Distribution](#team-work-distribution)
3. [8-Week Timeline with Team Goals](#8-week-timeline-with-team-goals)
4. [Week-by-Week Detailed Tasks](#week-by-week-detailed-tasks)
5. [Meeting & Collaboration Structure](#meeting--collaboration-structure)
6. [Evaluation & Competition](#evaluation--competition)

---

## Team Organization & Project Structure

### **4 Complete Teams = 4 Independent Complete Projects**

Each team develops the **entire Project Nexus system** independently:

```
┌─────────────────────────────────────────────────────────────┐
│                    TEAM 1 Project                            │
│  (Complete System: 4 Backend Services + React Frontend)     │
│                                                              │
│  Repository: team1-nexus-complete                           │
│  Deployment: 4 services on Railway (Team 1's account)       │
│  Database: PostgreSQL instance for Team 1                   │
│  Frontend: https://team1-nexus-frontend.railway.app         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    TEAM 2 Project                            │
│  (Complete System: 4 Backend Services + React Frontend)     │
│                                                              │
│  Repository: team2-nexus-complete                           │
│  Deployment: 4 services on Railway (Team 2's account)       │
│  Database: PostgreSQL instance for Team 2                   │
│  Frontend: https://team2-nexus-frontend.railway.app         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    TEAM 3 Project                            │
│  (Complete System: 4 Backend Services + React Frontend)     │
│                                                              │
│  Repository: team3-nexus-complete                           │
│  Deployment: 4 services on Railway (Team 3's account)       │
│  Database: PostgreSQL instance for Team 3                   │
│  Frontend: https://team3-nexus-frontend.railway.app         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    TEAM 4 Project                            │
│  (Complete System: 4 Backend Services + React Frontend)     │
│                                                              │
│  Repository: team4-nexus-complete                           │
│  Deployment: 4 services on Railway (Team 4's account)       │
│  Database: PostgreSQL instance for Team 4                   │
│  Frontend: https://team4-nexus-frontend.railway.app         │
└─────────────────────────────────────────────────────────────┘
```

---

## Team Work Distribution

### **Each Team: 8 Students Building Complete System**

#### **Team Composition (Each Team of 8)**

```
TEAM [N] STRUCTURE (8 Students)
│
├─ 2 Backend Developers
│  └─ Responsible for:
│     • User Service (Auth, Roles, Reputation)
│     • Catalog Service (Products, Categories, Search)
│     • Commerce Service (Cart, Orders, Payments)
│     • Auction Service (Bidding, Settlements)
│     • API Gateway setup & configuration
│     • Service-to-service communication
│
├─ 2 React Frontend Developers
│  └─ Responsible for:
│     • Login & authentication UI
│     • Product browsing & search pages
│     • Shopping cart & checkout flow
│     • Auction listing & live bidding UI
│     • User dashboard
│     • Component library & styling
│
├─ 2 Database Developers
│  └─ Responsible for:
│     • Schema design for all 4 services
│     • Entity Framework Core migrations
│     • Indexes & query optimization
│     • Database relationships
│     • Seed data & test fixtures
│
├─ 1 QA/Testing Engineer
│  └─ Responsible for:
│     • Unit tests for all services
│     • Integration tests
│     • API testing
│     • React component testing
│     • Performance testing (auction bidding)
│     • Deployment testing
│
└─ 1 Team Lead
   └─ Responsible for:
      • Sprint planning & coordination
      • Daily standups (async + on-campus)
      • Code review approval
      • Stakeholder communication
      • Deployment coordination
      • Demo preparation
```

---

### **Work Distribution per Role (8-Week Timeline)**

#### **Backend Developers (2 per team)**

| Week | User Service | Catalog Service | Commerce Service | Auction Service |
|------|---|---|---|---|
| 1 | Setup, Schema | Setup, Schema | Setup, Schema | Setup, Schema |
| 2 | Auth APIs | Product CRUD | Cart APIs | Auction APIs |
| 3 | JWT, Roles | Search, Filtering | Checkout | Bidding, Settlement |
| 4 | Reputation | Event handling | Event handling | Event publishing |
| 5 | API Gateway | Performance | Stripe integration | SignalR real-time |
| 6 | Tests, Logs | Tests, Optimization | Tests, Retries | Tests, Load test |
| 7 | Deploy Railway | Deploy Railway | Deploy Railway | Deploy Railway |
| 8 | Demo prep | Demo prep | Demo prep | Demo prep |

**Note:** Backend devs work on ALL services together as a pair. One might focus on User Service while other handles Catalog, etc., but both understand all services.

---

#### **Frontend Developers (2 per team)**

| Week | Component | Feature |
|------|---|---|
| 1 | Setup, Project structure | Create-React-App / Vite setup |
| 2 | Auth pages | Login, Register forms |
| 3 | Product pages | Product list, detail, search |
| 4 | Cart & Checkout | Cart display, checkout flow |
| 5 | Auction pages | Auction list, detail, live bidding (SignalR) |
| 6 | Tests, Polish | Unit tests, responsive design, error handling |
| 7 | Deploy Railway | Build & deploy to Railway |
| 8 | Demo prep | Polish, demo scenarios |

---

#### **Database Developers (2 per team)**

| Week | Focus |
|------|---|
| 1 | PostgreSQL setup locally, schema design planning |
| 2 | Create Users, Roles, Products, Categories tables |
| 3 | Create Orders, OrderItems, Auctions, Bids tables |
| 4 | Add foreign keys, relationships, constraints |
| 5 | Create indexes for search & auction queries |
| 6 | Query optimization, performance testing, seed data |
| 7 | Migrate to Railway PostgreSQL, verify data integrity |
| 8 | Backup strategy, documentation |

---

#### **QA/Testing Engineer (1 per team)**

| Week | Focus |
|------|---|
| 1 | Setup testing environment, test framework |
| 2 | Unit tests for Auth, password hashing, JWT |
| 3 | Unit tests for Product CRUD, Cart operations |
| 4 | Integration tests for service communication |
| 5 | API tests for all endpoints, Stripe test payments |
| 6 | Load testing (1000 bids/min), performance benchmarks |
| 7 | End-to-end testing, deployment verification |
| 8 | Final regression testing, demo scenarios |

---

#### **Team Lead (1 per team)**

| Week | Focus |
|------|---|
| 1 | Team kickoff, role assignments, sprint planning |
| 2 | Daily standups, progress tracking |
| 3 | Code review coordination, blocker resolution |
| 4 | Integration testing coordination |
| 5 | Feature completion verification |
| 6 | Performance testing & optimization |
| 7 | Deployment coordination, Railway setup |
| 8 | Demo preparation, final polish |

---

## 8-Week Timeline with Team Goals

### **Complete Timeline (All Teams Follow Same Schedule)**

```
WEEK 1: Kickoff & Setup
├─ Backend: All 4 services skeleton, database schema design
├─ Frontend: React project initialized, components structure
├─ Database: PostgreSQL local setup, schema creation
├─ QA: Testing framework setup
└─ Deliverable: All services respond to /health

WEEK 2: Foundation APIs - Authentication & Products
├─ Backend: 
│  ├─ User Service: Registration, Login, JWT tokens
│  └─ Catalog Service: Product CRUD, Categories
├─ Frontend: Login UI, Product list component
├─ Database: All schema created with relationships
├─ QA: Auth & product CRUD tests
└─ Deliverable: Users can register, login, browse products

WEEK 3: Core Features - Checkout & Auction Basics
├─ Backend:
│  ├─ Commerce: Shopping cart, checkout, basic orders
│  ├─ Auction: Create auctions, list, basic bidding
│  └─ User: Roles, reputation system
├─ Frontend: Cart UI, checkout flow, auction pages
├─ QA: Cart, checkout, auction tests
└─ Deliverable: Complete shopping flow, basic auctions

WEEK 4: Service Integration & Events
├─ All Services: Event-driven communication via RabbitMQ
├─ Events: AuctionSettled → OrderCreated, ProductUpdated → Search
├─ Database: Query optimization, first indexes
├─ QA: Integration tests
└─ Deliverable: Services loosely coupled via events

WEEK 5: Advanced Features - Real-time & Payments
├─ Backend:
│  ├─ Auction: SignalR for live bidding (WebSockets)
│  └─ Commerce: Stripe payment integration (test mode)
├─ Frontend: Live bidding UI, payment form
├─ QA: Real-time tests, payment flow tests
└─ Deliverable: Real-time bidding, payment checkout works

WEEK 6: Testing & Performance
├─ QA: Tests ≥70% coverage across all services
├─ Backend: Performance optimization, caching
├─ Database: Load testing (1000 bids/min on auctions)
├─ Frontend: Responsive design, error handling
└─ Deliverable: Production-ready code quality

WEEK 7: Deployment to Railway
├─ Backend: Deploy 4 services to Railway
├─ Database: Migrate PostgreSQL to Railway
├─ Frontend: Build & deploy React to Railway
├─ Message Broker: RabbitMQ on Railway
└─ Deliverable: Complete project live at 5 URLs:
   ├─ https://team[N]-user-service.railway.app
   ├─ https://team[N]-catalog-service.railway.app
   ├─ https://team[N]-commerce-service.railway.app
   ├─ https://team[N]-auction-service.railway.app
   └─ https://team[N]-nexus-frontend.railway.app

WEEK 8: Demo Preparation & Final Polish
├─ All: Bug fixes, documentation
├─ Demo: Create scenarios, practice walkthrough
├─ Frontend: UI polish, demo data
├─ Documentation: README, API docs, deployment guide
└─ Deliverable: Ready for stakeholder demo
```

---

## Week-by-Week Detailed Tasks

### **WEEK 1: Kickoff & Environment Setup**

#### **Monday On-Campus (09:00-12:00)**

**09:00-09:30: Full Group Kickoff (All 32 Students)**
- Project overview & system architecture
- Each team introduced
- Technology stack explanation
- Success criteria & timeline

**09:30-10:00: Team Assignments Finalized**
- 4 teams of 8 confirmed
- Roles assigned within each team
- GitHub repos assigned
- Railway accounts created

**10:00-11:00: Environment Setup Workshop**
- Install Visual Studio 2022 / VS Code
- Install Node.js & npm
- Install Docker Desktop
- Install PostgreSQL tools
- Install Railway CLI

**11:00-12:00: Technical Deep-Dive**
- Project structure walkthrough
- API architecture explained
- Database design overview
- How to run services locally

---

#### **Tuesday-Friday (Remote)**

**Each Team:**
- Clone their team repo
- Setup PostgreSQL locally
- Run docker-compose (skeleton provided)
- Each developer runs hello-world API locally
- Verify environment working
- Create first git commit (README per team member)

**Deliverables by Friday:**
```
✅ Team 1: Local env working, API responds
✅ Team 2: Local env working, API responds
✅ Team 3: Local env working, API responds
✅ Team 4: Local env working, API responds
✅ React projects initialized for all teams
✅ PostgreSQL running locally for all teams
```

---

#### **Wednesday On-Campus (14:00-17:00)**

**14:00-14:30: Team Leads Sync**
- Review setup progress
- Clarify architecture with you
- Discuss sprint planning

**14:30-15:30: Lab Time**
- Each team works on environment
- You rotate helping teams

**15:30-17:00: Optional Deep-Dive**
- Git workflow & code reviews
- Docker basics
- Database concepts

---

### **WEEK 2: Foundation APIs - Authentication & Products**

#### **Team Tasks**

**Backend Developers (2 per team):**

*User Service:*
```csharp
POST /api/users/register
  Input: { email, password, fullName }
  Output: { userId, email, token }

POST /api/users/login
  Input: { email, password }
  Output: { userId, email, token, roleId }

GET /api/users/{userId}
  Requires: JWT token
```

*Catalog Service:*
```csharp
GET /api/products
  Query: page, pageSize, categoryId, search
  Output: Paginated product list

GET /api/products/{productId}
  Output: Product details

GET /api/categories
  Output: All categories
```

**Frontend Developers (2 per team):**
- LoginForm.tsx component
- RegisterForm.tsx component
- ProtectedRoute wrapper
- ProductList.tsx component
- ProductCard.tsx component

**Database Developers (2 per team):**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  full_name VARCHAR(255),
  created_at TIMESTAMP
);

CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  price DECIMAL(10, 2),
  category_id UUID,
  created_at TIMESTAMP
);

CREATE TABLE categories (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  created_at TIMESTAMP
);
```

**QA Engineer (1 per team):**
```csharp
[Fact]
public async Task Register_WithValidEmail_ReturnsToken()
{
  // Test successful registration
}

[Fact]
public async Task Login_WithInvalidPassword_ReturnsForbidden()
{
  // Test failed login
}

[Fact]
public void ProductList_DisplaysCorrectly()
{
  // React component test
}
```

**Team Lead (1 per team):**
- Daily standup coordination
- PR review approval (with you)
- Blocker tracking

**Weekly Deliverables (Week 2 End):**
```
✅ User registration & login working locally
✅ JWT tokens generated & validated
✅ Product CRUD endpoints working
✅ React login pages completed
✅ Product list page showing products
✅ All tests passing
✅ Deployed to local docker-compose
```

---

### **WEEK 3: Core Features - Cart, Checkout, Auctions**

#### **Backend Developers Add:**

*Commerce Service:*
```csharp
POST /api/carts/{userId}/items
  Add item to cart

GET /api/carts/{userId}
  Get current cart

POST /api/orders
  Create order from cart

POST /api/orders/{orderId}/checkout
  Start checkout process
```

*Auction Service:*
```csharp
POST /api/auctions
  Create new auction

GET /api/auctions
  List all auctions

GET /api/auctions/{auctionId}
  Get auction details

POST /api/auctions/{auctionId}/bids
  Place a bid
```

*User Service Additions:*
```csharp
POST /api/roles
  Create role

POST /api/users/{userId}/roles
  Assign role

GET /api/users/{userId}/reputation
  Get reputation score
```

---

#### **Frontend Developers Add:**

- CartSummary.tsx
- CartPage.tsx
- CheckoutFlow.tsx
- AuctionList.tsx
- AuctionDetail.tsx
- BidHistory.tsx

---

#### **Weekly Deliverables (Week 3 End):**
```
✅ Complete shopping flow (add to cart → checkout)
✅ Basic auction system (create, list, bid)
✅ Reputation scoring
✅ React pages for all features
✅ Tests passing >70% of code
✅ All services integrated
```

---

### **WEEK 4: Service Integration & RabbitMQ Events**

#### **All Teams:**

**Setup RabbitMQ Locally:**
```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 \
  -e RABBITMQ_DEFAULT_USER=admin \
  -e RABBITMQ_DEFAULT_PASS=password \
  rabbitmq:3-management
```

**Key Events to Implement:**

| Event | Publisher | Subscriber | Action |
|---|---|---|---|
| `AuctionSettled` | Auction Service | Commerce Service | Create order |
| `OrderCreated` | Commerce Service | All Services | Notify, update |
| `ProductCreated` | Catalog Service | Search Index | Index product |
| `BidPlaced` | Auction Service | Frontend (SignalR) | Update UI |

**Example Event Publishing (C#):**
```csharp
public class OrderService
{
    private readonly IEventBus _eventBus;
    
    public async Task CreateOrderAsync(Order order)
    {
        await _orderRepository.AddAsync(order);
        
        // Publish event
        await _eventBus.PublishAsync(new OrderCreatedEvent
        {
            OrderId = order.Id,
            UserId = order.UserId,
            Total = order.Total
        });
    }
}
```

**Weekly Deliverables (Week 4 End):**
```
✅ RabbitMQ working locally
✅ All services publishing events
✅ All services subscribing to events
✅ Auction → Order creation working
✅ Services loosely coupled
✅ Integration tests passing
```

---

### **WEEK 5: Real-Time Bidding & Payment Integration**

#### **Backend Developers:**

*Auction Service - SignalR Setup:*
```csharp
public class AuctionHub : Hub
{
    [Authorize]
    public async Task JoinAuction(Guid auctionId)
    {
        await Groups.AddToGroupAsync(Connection.ConnectionId, 
            $"auction-{auctionId}");
    }
    
    [Authorize]
    public async Task PlaceBid(Guid auctionId, decimal amount)
    {
        // Validate & save
        var bid = await _auctionService.PlaceBidAsync(
            auctionId, User.Identity.Name, amount);
        
        // Broadcast to auction room
        await Clients.Group($"auction-{auctionId}")
            .SendAsync("BidPlaced", new 
            { 
                Amount = bid.Amount, 
                Bidder = bid.BidderName,
                Time = bid.CreatedAt 
            });
    }
}
```

*Commerce Service - Stripe Payment:*
```csharp
public class PaymentService
{
    public async Task<PaymentResult> ProcessPaymentAsync(
        Guid orderId, PaymentMethodDto paymentMethod)
    {
        var paymentIntent = await _stripeClient.CreatePaymentIntentAsync(
            new { amount = order.Total * 100, currency = "usd" });
        
        return new PaymentResult 
        { 
            OrderId = orderId, 
            PaymentId = paymentIntent.Id 
        };
    }
}
```

#### **Frontend Developers:**

*Real-time Auction Bidding:*
```typescript
export const LiveBidding = ({ auctionId }) => {
    const [connection, setConnection] = useState(null);
    const [bids, setBids] = useState([]);
    
    useEffect(() => {
        const conn = new HubConnectionBuilder()
            .withUrl('/auction-hub')
            .withAutomaticReconnect()
            .build();
        
        conn.on('BidPlaced', (bid) => {
            setBids(prev => [...prev, bid]);
        });
        
        conn.start();
        conn.invoke('JoinAuction', auctionId);
        setConnection(conn);
    }, [auctionId]);
    
    return (
        <div>
            <h2>Live Auction</h2>
            {bids.map(bid => <BidItem key={bid.id} bid={bid} />)}
        </div>
    );
};
```

**Weekly Deliverables (Week 5 End):**
```
✅ Real-time bidding via SignalR working
✅ Live bid updates in React UI
✅ Stripe test payment processing
✅ Payment confirmation emails
✅ Order creation from payments
```

---

### **WEEK 6: Testing & Performance Optimization**

#### **QA Engineer Focus:**

**Unit Tests ≥70% coverage:**
```csharp
// User Service tests
[Fact]
public async Task CreateUser_WithValidData_Succeeds()

[Fact]
public async Task Login_WithInvalidPassword_ThrowsException()

// Product Service tests
[Fact]
public async Task GetProducts_WithFilter_ReturnsFiltered()

// Auction Service tests
[Fact]
public async Task PlaceBid_WithHigherAmount_ReplacesHighBid()

[Fact]
public async Task PlaceBid_WithLowerAmount_ReturnsForbidden()
```

**Integration Tests:**
```csharp
[Fact]
public async Task AuctionSettlement_CreatesOrder()
{
    // 1. Create auction
    // 2. Place bids
    // 3. Settle auction
    // 4. Verify order created
}

[Fact]
public async Task OrderCreated_PublishesEvent()
{
    // 1. Create order
    // 2. Verify event published
    // 3. Verify subscribers received
}
```

**Performance Testing:**
```bash
# Load test: 100 concurrent users placing 1000 bids
# Tool: Apache JMeter or k6
# Target: 1000 bids/minute sustained
# Measure: Response time, error rate, database load
```

**Database Optimization:**
- Add indexes on frequently queried columns
- Analyze slow queries
- Optimize N+1 queries with eager loading

**Frontend Tests:**
```typescript
import { render, screen } from '@testing-library/react';

test('ProductList displays products', () => {
    render(<ProductList />);
    expect(screen.getByText(/products/i)).toBeInTheDocument();
});

test('Cart updates when item added', async () => {
    render(<App />);
    const addBtn = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addBtn);
    expect(screen.getByText(/1 item/i)).toBeInTheDocument();
});
```

**Weekly Deliverables (Week 6 End):**
```
✅ Unit test coverage ≥70%
✅ Integration tests passing
✅ Load test: 1000 bids/minute sustained
✅ Performance optimized
✅ Database queries optimized
✅ No memory leaks
✅ Responsive UI on mobile & desktop
```

---

### **WEEK 7: Deployment to Railway**

#### **Deployment Steps (All Teams Follow Same Process)**

**Monday: Backend Services Deployment**

```bash
# Team 1 Backend Deployment
cd team1-nexus-complete

# 1. Build services
dotnet build -c Release --no-restore

# 2. Run tests
dotnet test

# 3. Create Docker images
docker build -t team1-user-service:v1.0 ./Services/UserService
docker build -t team1-catalog-service:v1.0 ./Services/CatalogService
docker build -t team1-commerce-service:v1.0 ./Services/CommerceService
docker build -t team1-auction-service:v1.0 ./Services/AuctionService

# 4. Login to Railway
railway login

# 5. Create Railway projects
railway init  # For each service

# 6. Deploy each service
cd Services/UserService
railway variables set DATABASE_URL="postgresql://..."
railway variables set JWT_SECRET="secret"
railway up

# Repeat for other 3 services
```

**Tuesday: Database & Message Broker**

```bash
# Create PostgreSQL on Railway
railway resource create postgresql

# Get connection string
railway variables get DATABASE_URL

# Create RabbitMQ on Railway
railway resource create rabbitmq

# Get RabbitMQ URL
railway variables get RABBITMQ_URL

# Apply migrations
dotnet ef database update -c UserDbContext -- --connection "railroad_connection"
```

**Wednesday: Frontend Deployment**

```bash
cd team1-nexus-frontend

# Build for production
npm run build

# Deploy to Railway
railway up

# Verify deployed
curl https://team1-nexus-frontend.railway.app
```

**Thursday: Verification & Testing**

```bash
# Test all endpoints
curl https://team1-user-service.railway.app/api/users/health
curl https://team1-catalog-service.railway.app/api/products
curl https://team1-commerce-service.railway.app/api/orders
curl https://team1-auction-service.railway.app/api/auctions

# Test frontend
open https://team1-nexus-frontend.railway.app
# Go through complete shopping flow
# Test live bidding
```

**Weekly Deliverables (Week 7 End):**
```
✅ Team 1: All services live on Railway
✅ Team 2: All services live on Railway
✅ Team 3: All services live on Railway
✅ Team 4: All services live on Railway
✅ Each team has working complete system
✅ Each team can show working demo
```

**Live Deployment URLs (Example - Team 1):**
```
User Service:     https://team1-user-service.railway.app
Catalog Service:  https://team1-catalog-service.railway.app
Commerce Service: https://team1-commerce-service.railway.app
Auction Service:  https://team1-auction-service.railway.app
Frontend:         https://team1-nexus-frontend.railway.app
```

---

### **WEEK 8: Demo Preparation & Final Polish**

#### **All Teams Prepare:**

**Demo Scenarios (Practice 3+ times):**

**Scenario 1: New User Journey (10 min)**
- Register new account
- Login with credentials
- Browse products (search, filter)
- View product detail
- Add to cart
- Checkout with test payment
- See order confirmation

**Scenario 2: Auction Participation (10 min)**
- View active auctions
- Place bid on auction
- Watch real-time bid updates
- Get outbid notification
- See auction end & winner

**Scenario 3: Admin/Dashboard (5 min)**
- View user profile & reputation
- View order history
- View bid history

**Final Tasks:**

1. **Documentation:**
   - README.md per team
   - API documentation (Swagger)
   - Architecture overview
   - Deployment guide
   - Lessons learned

2. **Code Quality:**
   - All tests passing
   - No compiler warnings
   - Code comments where complex
   - Consistent formatting

3. **UI/UX Polish:**
   - No broken images
   - Responsive on mobile
   - Error messages clear
   - Loading indicators
   - Success messages

4. **Performance:**
   - Frontend load time <3 seconds
   - API responses <500ms
   - Auction bidding <300ms
   - No memory leaks

5. **Demo Preparation:**
   - Seed data ready
   - Demo accounts created
   - Screenshots/videos prepared
   - Presentation slides
   - Backup plan if something breaks

**Weekly Deliverables (Week 8 End):**
```
✅ Complete project demonstrated
✅ All features working live
✅ Documentation complete
✅ Code ready for production
✅ Ready for stakeholder demo
```

---

## Meeting & Collaboration Structure

### **On-Campus Sessions (Monday & Wednesday)**

#### **Monday (09:00-12:00): Planning & Technical Guidance**

```
09:00-09:15: All Teams Standup (32 students)
- Each team: 45 seconds progress update
- Blockers raised
- This week's focus confirmed

09:15-10:00: Per-Team Workshops (Split into 4 rooms)
- You rotate 15 min per team
- Address blockers
- Code review highlights
- Answer technical questions

10:00-11:00: Mini-Lecture (All students)
- Week 1: Microservices patterns
- Week 2: API design best practices
- Week 3: Database relationships & optimization
- Week 4: Event-driven architecture
- Week 5: Real-time communication (SignalR)
- Week 6: Testing strategies & performance
- Week 7: DevOps & deployment
- Week 8: Demo & retrospective

11:00-12:00: Lab Time or Optional 1:1
- Teams work on current sprint
- Hands-on debugging help
- Optional career mentoring
```

---

#### **Wednesday (14:00-17:00): Code Review & Problem-Solving**

```
14:00-14:15: Status Sync (All)
- Mid-week check-in
- Any blockers?

14:15-15:15: Code Review Time
- You review PRs from all teams
- Discuss code quality
- Approve/request changes
- Mentoring on best practices

15:15-16:15: Hands-On Lab
- Each team works on current sprint
- You help with debugging
- Complex feature implementation
- Testing setup

16:15-17:00: Free Work + Q&A
- Teams continue working
- Optional individual help
- Answer questions
```

---

### **Remote Days (Tuesday, Thursday, Friday, Sat, Sun)**

#### **Daily Standup (Async via Slack)**

**Team Lead posts daily:**
```
Team 1 Daily Standup - [Date]

Completed:
✅ User registration API working
✅ Unit tests written (50 test cases)

Today:
⏳ JWT token validation
⏳ Create login integration test

Blockers:
🚫 None currently

Questions:
❓ Is password validation required client-side or server-side?
```

---

#### **Work Schedule**

```
Morning (09:00-12:00): Development
- Code implementation
- Database work
- Frontend components
- Create PRs

Afternoon (14:00-17:00): Collaboration
- Code review (peer + lead)
- Slack discussions
- Documentation
- Issue tracking

Evening (Optional): Deep work
- Complex debugging
- Performance optimization
- Extra learning
```

---

#### **Code Review Process**

```
1. Developer finishes feature
   ↓
2. Creates PR with:
   - What changed?
   - Why?
   - How to test?
   - Link to issue/task
   ↓
3. Requests review:
   - Team Lead (required)
   - 1-2 teammates (recommended)
   ↓
4. Reviewers check:
   - Code quality
   - Tests included?
   - Follows conventions?
   - No secrets?
   ↓
5. Developer addresses feedback
   ↓
6. Team Lead approves & merges
   ↓
7. Deploy to staging (if applicable)

Timeline: 24 hours for review
```

---

## Evaluation & Competition

### **Individual Student Grading (100 points)**

| Category | Points | Criteria |
|----------|--------|----------|
| **Code Quality** | 25 | Follows conventions, tests written, no warnings, proper error handling |
| **Collaboration** | 25 | PR reviews given, helps teammates, communicates progress, attends meetings |
| **Technical Understanding** | 20 | Can explain design decisions, learns from feedback, debugging skills |
| **Delivery** | 20 | Completes assigned tasks, meets sprint goals, deployment ready |
| **Documentation** | 10 | Code comments, API docs, README, deployment guide |
| **Total** | **100** | |

---

### **Team Grading (Overall Project Quality)**

| Aspect | Points | Criteria |
|--------|--------|----------|
| **Functionality** | 25 | All features working, no bugs, happy path complete |
| **Code Quality** | 25 | Architecture followed, tests ≥70%, readable code |
| **Performance** | 15 | API <500ms, auction bidding <300ms, load test successful |
| **Documentation** | 15 | API docs, architecture docs, deployment guide |
| **Demo Readiness** | 10 | Polish, edge cases handled, demo scenarios work |
| **Deployment** | 10 | Successful Railway deployment, monitoring setup |
| **Total** | **100** | |

---

### **Team Comparison & Recognition**

**After Week 8 Demo:**

**Best Overall Project:**
- Full feature completeness
- Code quality
- Team collaboration
- Demo presentation

**Best Backend Architecture:**
- Microservices patterns followed
- Event-driven communication
- Performance optimization

**Best Frontend UI/UX:**
- Responsive design
- User experience polish
- Real-time features smooth

**Best Team Collaboration:**
- Communication quality
- Code review thoroughness
- Knowledge sharing
- Helping peers

**Most Improved Team:**
- Progress from Week 1 → Week 8
- Learning curve
- Overcoming challenges

---

## Slack Channels Setup

```
#nexus-general              - All students announcements
#nexus-team1                - Team 1 discussions
#nexus-team2                - Team 2 discussions
#nexus-team3                - Team 3 discussions
#nexus-team4                - Team 4 discussions
#nexus-frontend             - Frontend discussions (all teams)
#nexus-backend              - Backend discussions (all teams)
#nexus-help                 - Questions & help requests
#nexus-deployments          - Deployment updates
#nexus-wins                 - Celebrate achievements
```

---

## Repository Structure per Team

**Team 1 Repository: team1-nexus-complete**

```
team1-nexus-complete/
│
├── README.md
├── docker-compose.yml
├── .gitignore
├── .env.example
│
├── Services/
│   ├── UserService/
│   │   ├── src/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   └── UserService.csproj
│   │
│   ├── CatalogService/
│   │   ├── src/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   └── CatalogService.csproj
│   │
│   ├── CommerceService/
│   │   ├── src/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   └── CommerceService.csproj
│   │
│   └── AuctionService/
│       ├── src/
│       ├── tests/
│       ├── Dockerfile
│       └── AuctionService.csproj
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── types/
│   ├── tests/
│   ├── package.json
│   ├── vite.config.ts
│   ├── Dockerfile
│   └── .env.example
│
├── Infrastructure/
│   ├── database/
│   │   └── migrations/
│   ├── messaging/
│   │   └── events/
│   └── docker-compose.yml
│
└── Documentation/
    ├── ARCHITECTURE.md
    ├── API_DOCUMENTATION.md
    ├── DATABASE_SCHEMA.md
    ├── DEPLOYMENT_GUIDE.md
    ├── LESSONS_LEARNED.md
    └── TESTING_REPORT.md
```

Same structure for Team 2, 3, 4 (with team2-, team3-, team4- prefixes)

---

## Success Checklist

### **Pre-Internship (This Week)**

- [ ] 4 teams assigned (8 students each)
- [ ] 4 team leads selected
- [ ] 4 GitHub repos created (team[1-4]-nexus-complete)
- [ ] 4 Railway accounts created
- [ ] Slack workspace setup
- [ ] Meeting rooms reserved (Mon & Wed)
- [ ] This plan shared with all teams
- [ ] Docker & PostgreSQL tested locally
- [ ] Week 1 kickoff presentation prepared

### **Week 1**

- [ ] All students have working environments
- [ ] All services respond to /health
- [ ] React projects initialized
- [ ] PostgreSQL running locally
- [ ] First code commits made
- [ ] Team structure understood

### **Weeks 2-3**

- [ ] User authentication working
- [ ] Product browsing working
- [ ] Shopping cart working
- [ ] Auction system working
- [ ] Tests passing >50%

### **Weeks 4-5**

- [ ] RabbitMQ event-driven working
- [ ] Real-time bidding working
- [ ] Stripe test payments working
- [ ] All services communicating

### **Week 6**

- [ ] Tests ≥70% coverage
- [ ] Performance targets met
- [ ] Load testing successful
- [ ] No critical bugs

### **Week 7**

- [ ] All services deployed
- [ ] Database migrated to Railway
- [ ] Frontend deployed
- [ ] End-to-end working live

### **Week 8**

- [ ] Demo scenarios working
- [ ] Documentation complete
- [ ] Code production-ready
- [ ] Demo presentation prepared

---

## Summary

### **What Each Team Delivers**

**Team 1 Complete Project:**
- 4 backend services (User, Catalog, Commerce, Auction)
- React frontend
- PostgreSQL database
- RabbitMQ message broker
- Live at 5 Railway URLs
- Full documentation
- Demo video/presentation

**Team 2 Complete Project:**
- Same as Team 1 (independent implementation)

**Team 3 Complete Project:**
- Same as Team 1 (independent implementation)

**Team 4 Complete Project:**
- Same as Team 1 (independent implementation)

---

### **Learning Outcomes (Each Student)**

✅ **Full-stack microservices development**  
✅ **Real-world deployment experience**  
✅ **Team collaboration & code reviews**  
✅ **Testing & quality assurance**  
✅ **Performance optimization**  
✅ **Real-time communication (SignalR)**  
✅ **Event-driven architecture**  
✅ **Frontend & backend integration**  

---

### **Key Advantages of This Approach**

| Advantage | Benefit |
|-----------|---------|
| **Complete ownership** | Each team understands full system |
| **Independent learning** | No single point of failure |
| **Parallel work** | All teams progress at own pace |
| **Clear goals** | Weekly milestones for each team |
| **Competition** | Healthy motivation to excel |
| **Real experience** | Full microservices project from scratch |
| **Demo ready** | Each team has working complete project |
| **Scalable** | Can be repeated with different teams |

---

## Next Steps

### **This Week (Before Week 1)**

1. Review this plan
2. Assign 8 students per team
3. Select team leads
4. Create GitHub repos
5. Setup Railway accounts
6. Test local environment
7. Send plan to all teams

### **Week 1 Monday**

- Full group kickoff
- 32 students in one room
- Architecture walkthrough
- Team assignments finalized
- Environment setup begins

---

**You're ready to launch! Each team will have a complete, working Project Nexus system by the end of Week 8. This is an excellent 2-month learning experience. 🚀**

---

END OF DOCUMENT