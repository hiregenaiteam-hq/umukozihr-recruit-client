# API\_INTEGRATION\_SPEC — HR Talent Agent System

Version: 1.0.0
Spec: OAS 3.1 (source path: `/openapi.json`)
Summary: AI-powered talent sourcing using multi-agent workflows
Full Reference: api_full_reference.md
---

## 1) Base setup

**Base URL**

* Use an env var. Example: `BASE_URL=https://https://agent-architecture.onrender.com/`
* All paths in this doc are relative to `BASE_URL`

**Content types**

* Requests: `application/json` unless specified
* Form endpoints: `application/x-www-form-urlencoded`
* Responses: `application/json`

**Time format**

* ISO 8601 with timezone, e.g. `2025-08-08T12:31:07Z`

**Authentication**

* Password grant style login

  * New: `/api/v1/auths/login`
  * Legacy: `/v1/auth/login`
* Use `Authorization: Bearer <access_token>` for protected endpoints
* Refresh tokens:

  * New: `/api/v1/auths/refresh?refresh_token=...`
  * Legacy: `/v1/auth/refresh?refresh_token=...`
* Logout:

  * New: `/api/v1/auths/logout`
  * Legacy: `/v1/auth/logout`

**Environments & headers**

* Required headers per request:

  * `Authorization` for protected routes
  * `Accept: application/json`
  * `Content-Type: application/json` (or form for login)
* CORS: not specified. If calling from browser, configure server accordingly.

**Pagination**

* Uses `limit` and `offset` where applicable
* Defaults are documented per endpoint

**Errors**

* Validation errors: HTTP 422 with body:

  ```json
  { "detail": [ { "loc": [...], "msg": "string", "type": "string" } ] }
  ```
* Auth errors: expect 401/403 (not enumerated in examples, but treat as standard)
* Success codes used: 200, 201, 204

---

## 2) Auth flows

### 2.1 Login (new)

`POST /api/v1/auths/login`
Form fields:

* `grant_type` = `password`
* `username` (string)
* `password` (string)
* optional: `scope`, `client_id`, `client_secret`

**Response 200**

```json
{
  "id":"string","email":"string","username":"string","full_name":"string",
  "company":"string","job_title":"string",
  "is_active":true,"is_verified":true,"is_premium":true,
  "subscription_tier":"string","monthly_search_limit":0,"monthly_searches_used":0,
  "created_at":"2025-08-08T12:31:07.614Z",
  "access_token":"string","refresh_token":"string","token_type":"bearer",
  "session_id":"string"
}
```

**cURL**

```bash
curl -X POST "$BASE_URL/api/v1/auths/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password&username=john@example.com&password=secret"
```

### 2.2 Refresh token (new)

`POST /api/v1/auths/refresh?refresh_token=<token>`

**Response 200**
Same envelope as login with new tokens.

### 2.3 Logout (new)

`POST /api/v1/auths/logout`
Clears current session. Returns 200 with string.

### 2.4 Me

* `GET /api/v1/auths/me` → user profile
* `DELETE /api/v1/auths/me` → delete current account (204)

> Legacy `/v1/auth/*` endpoints mirror the new ones. Prefer `/api/v1/auths/*`.

---

## 3) Users

### 3.1 Create user

`POST /api/v1/users/`
Body: not shown in examples — treat as standard create. Likely requires email/username/password. If missing, use auth create then update.

### 3.2 Get user

`GET /api/v1/users/users/{user_id}`

### 3.3 Update user

`PUT /api/v1/users/{user_id}`
Body:

```json
{ "username":"string","full_name":"string","company":"string","job_title":"string" }
```

**Response 200**

```json
{
  "id":"string","email":"string","username":"string","full_name":"string",
  "company":"string","job_title":"string",
  "is_active":true,"is_verified":true,"is_premium":true,
  "subscription_tier":"string","monthly_search_limit":0,"monthly_searches_used":0,
  "created_at":"2025-08-08T12:31:07.557Z"
}
```

### 3.4 Email OTP & password reset

* `POST /api/v1/users/create-email-otp` → `{ "email": "user@example.com" }`
* `POST /api/v1/users/verify-email` → `{ "email":"...", "otp":"..." }`
* `POST /api/v1/users/resend-verification` → `{ "email":"..." }`
* `POST /api/v1/users/reset-password-request` → `{ "email":"..." }`
* `POST /api/v1/users/reset-password-verify` →

  ```json
  {
    "email":"user@example.com","otp":"string",
    "current_password":"string",
    "new_password":"stringst","confirm_password":"string"
  }
  ```

### 3.5 Get user by phone

`GET /api/v1/users/by-phone/{phone}`
Returns user and `subscription` object.

---

## 4) Subscriptions

* `POST /api/v1/subscriptions/` create

  ```json
  { "tier": "basic|pro|business", "is_auto_renew": false }
  ```

  **201** returns SubscriptionResponse

* `GET /api/v1/subscriptions/me`

* `GET /api/v1/subscriptions/me/history`

* `PUT /api/v1/subscriptions/{subscription_id}`

  ```json
  { "tier":"basic|pro|business", "status":"active|canceled|expired|suspended", "is_auto_renew": true }
  ```

* `POST /api/v1/subscriptions/{subscription_id}/cancel`

* `GET /api/v1/subscriptions/subscriptions/{subscription_id}`

---

## 5) Talent search — high level

There are two search stacks:

1. **Search service** under `/api/v1/search/*`
2. **Core Signal** (LinkedIn-derived data collection & DB search) under `/api/v1/core-signal/*`

Use cases:

* Quick mock: `/api/v1/search/search/simple-mock`
* Full ranked search with criteria: `/api/v1/search/search`
* Retrieve results by `search_id`: `/api/v1/search/search/{search_id}`
* Refine an existing search: `/api/v1/search/search/{search_id}/refine`
* Generate search report: `/api/v1/search/search/{search_id}/report`
* Search history: `/api/v1/search/search/history`

**Search modes**

* `database` — query internal DB only
* `live` — live sources
* `hybrid` — both

**Core Signal** expands your index by collecting profiles:

* Kick off ID search → `/api/v1/core-signal/search-talents`
* Bulk fetch details by IDs → `/api/v1/core-signal/fetch-talent-details`
* Poll status → `/api/v1/core-signal/search-status/{search_id}`
* DB browse/filter → `/api/v1/core-signal/search-database` or `.../by-linkedin`

---

## 6) Talent search — endpoints in detail

### 6.1 Test utilities

* `GET /api/v1/search/test` → simple JSON to verify API
* `GET /api/v1/search/test-simple` → dependency-free string response

### 6.2 Simple mock search

`POST /api/v1/search/search/simple-mock`
Body (minimal validation):

```json
{
  "user_id":"string",
  "session_id":"string",
  "search_mode":"database",
  "criteria": {
    "job_titles":["string"],
    "skills_keywords":["string"],
    "location_full":"string",
    "location_country":"string",
    "location_country_iso2":"string",
    "experience_years_min":0,
    "experience_years_max":0,
    "management_level":"Intern",
    "department":"Engineering and Technical",
    "company_type":"Startup",
    "company_size_min":0,
    "company_size_max":0,
    "is_currently_employed":true,
    "exclude_keywords":["string"]
  },
  "max_results":50,
  "include_detailed_profiles":false,
  "save_search":true,
  "search_description":"string"
}
```

Returns `"string"` on success.

### 6.3 Full search

`POST /api/v1/search/search`
Same request shape as mock. **Response 200** is a `SearchResults` object containing:

* `search_id`, `user_id`, original `search_request`
* `results` array of ranked profiles with scores and optional `experience`, `education`, `certification_details`
* `total_results`, `search_duration`, `timestamp`, `search_summary`, `recommendations`

**cURL**

```bash
curl -X POST "$BASE_URL/api/v1/search/search" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d @search_request.json
```

**Python**

```python
import requests, os
r = requests.post(
  f"{os.environ['BASE_URL']}/api/v1/search/search",
  headers={"Authorization": f"Bearer {os.environ['TOKEN']}"},
  json={
    "user_id":"u_123","session_id":"s_abc","search_mode":"hybrid",
    "criteria":{
      "job_titles":["AI Engineer","ML Engineer"],
      "skills_keywords":["python","tensorflow","llms"],
      "location_full":"Accra, Ghana",
      "location_country":"Ghana","location_country_iso2":"GH",
      "experience_years_min":2,"experience_years_max":8,
      "management_level":"Specialist",
      "department":"Engineering and Technical",
      "company_type":"Startup",
      "is_currently_employed":True,
      "exclude_keywords":["internship"]
    },
    "max_results":50,"include_detailed_profiles":true,"save_search":true,
    "search_description":"AI eng in Accra with TensorFlow"
  }
)
r.raise_for_status()
data = r.json()
```

### 6.4 Get prior results

`GET /api/v1/search/search/{search_id}?user_id=<user>`
Returns the same `SearchResults` object.

### 6.5 Refine a search

`POST /api/v1/search/search/{search_id}/refine`
Body: same structure as search, with your updated fields. Returns a new `SearchResults` reflecting refinements.

### 6.6 Generate search report

`GET /api/v1/search/search/{search_id}/report?user_id=<user>`
Returns `SearchReport`:

* `executive_summary`, `key_findings`
* `aggregation_result` → ranked profiles with scores, timing, distributions
* `top_candidates_analysis`, `candidate_diversity_score`
* `market_insights`, `talent_availability`, `hiring_recommendations`, `search_optimization_tips`

### 6.7 Search history

`GET /api/v1/search/search/history?user_id=<user>&limit=20&offset=0`
Returns a list. Use for recent past searches.

---

## 7) Core Signal — data collection & DB

### 7.1 Health

`GET /api/v1/core-signal/` → health string

### 7.2 Kick off a talent ID search

`POST /api/v1/core-signal/search-talents`
Body:

```json
{
  "job_titles":["AI ENGINEER","MACHINE LEARNING","AI RESEARCHER"],
  "location_country":"Ghana",
  "location_full":"Accra",
  "skills_keywords":["python","tensorflow","machine learning"]
}
```

**Response 200**

```json
{
  "search_id": 0, "talent_ids": [0],
  "total_count": 0, "status": "string", "message": "string"
}
```

### 7.3 Bulk fetch details

`POST /api/v1/core-signal/fetch-talent-details`
Body: `[<talent_id>, ...]`
Returns a bulk processing summary.

### 7.4 Poll status

`GET /api/v1/core-signal/search-status/{search_id}`
Gives counts and status fields.

### 7.5 Database browsing

* `POST /api/v1/core-signal/search-database`
  Body:

  ```json
  {
    "headline_keywords":"AI Engineer, Machine Learning",
    "location_country":"Ghana",
    "location_country_iso2":"GH",
    "location_full":"Accra, Greater Accra Region, Ghana",
    "skills":["python","tensorflow","machine learning"]
  }
  ```

  Returns array of profiles with full details.

* `GET /api/v1/core-signal/search-database/by-linkedin?linkedin_url=<url>`

### 7.6 Talent CRUD

* `GET /api/v1/core-signal/talents?skip=0&limit=100`
* `GET /api/v1/core-signal/talents/{talent_id}`
* `DELETE /api/v1/core-signal/talents/{talent_id}`

### 7.7 Collect by direct ID or shorthand LinkedIn

* `POST /api/v1/core-signal/collect-by-id/{talent_id}`
* `POST /api/v1/core-signal/collect-by-shorthand-name?linkedin_url=<full-url>`

### 7.8 Search history

`GET /api/v1/core-signal/search-history?skip=0&limit=100`

---

## 8) Cache & search history (user-scoped)

* `GET /api/v1/cache/history?limit=20` → user’s search history
* `DELETE /api/v1/cache/history` → clear all
* `GET /api/v1/cache/history/{search_id}`
* `DELETE /api/v1/cache/history/{search_id}`
* `GET /api/v1/cache/statistics` → admin only
* `POST /api/v1/cache/cleanup` → cleanup expired cache
* `GET /api/v1/cache/cache-info` → config and user-specific info

---

## 9) Agents API

**Status & health**

* `GET /api/v1/agents/agents/status` → map of agents to `AgentStatus`
* `GET /api/v1/agents/agents/{agent_name}/status`
* `POST /api/v1/agents/agents/health-check` → `AgentHealthCheck`

**Ops**

* `GET /api/v1/agents/agents/metrics?agent_name=&time_range=1h|24h|7d`
* `POST /api/v1/agents/agents/{agent_name}/restart`
* `GET /api/v1/agents/agents/logs?agent_name=&level=INFO&limit=100&offset=0`
* `POST /api/v1/agents/agents/config` → update config
* `GET /api/v1/agents/agents/workflows?user_id=` → active workflows

---

## 10) Monitoring API

* `GET /api/v1/monitoring/health` → string
* `GET /api/v1/monitoring/metrics?time_window_hours=1`
* `GET /api/v1/monitoring/metrics/performance?operation=&time_window_hours=1`
* `GET /api/v1/monitoring/alerts?active_only=true`
* `POST /api/v1/monitoring/alerts/{alert_name}/clear`
* `GET /api/v1/monitoring/system/status` → string
* `GET /api/v1/monitoring/logs` → path listed, body unspecified

---

## 11) Chat API

* `POST /api/v1/chat/chat?message=...&session_id=&temperature=0.7` → chat with agent
* `GET /api/v1/chat/chat/history?session_id=&limit=50&offset=0`
* `GET /api/v1/chat/chat/sessions?limit=20&offset=0`
* `POST /api/v1/chat/chat/analyze-search?analysis_type=patterns|insights|recommendations&time_range=30d`
* `GET /api/v1/chat/chat/status` → `AgentStatus`
* `POST /api/v1/chat/chat/clear-session?session_id=...`
* `GET /api/v1/chat/chat/tools` → available MCP tools

---

## 12) Default health

* `GET /health` → string
* `GET /` → root info string

---

## 13) Schemas — key enums and shapes

Use exactly these values.

**SearchMode**

* `database`, `live`, `hybrid`

**ManagementLevel**

* `Intern`, `Specialist`, `Senior Specialist`, `Team Lead`, `Manager`, `Senior Manager`, `Director`, `VP`, `C-Level`

**Department**

* `Engineering and Technical`, `Sales`, `Marketing`, `Human Resources`, `Finance`, `Operations`, `Product`, `Design`, `Legal`, `Other`

**CompanyType**

* `Startup`, `Privately Held`, `Public Company`, `Nonprofit`, `Government Agency`, `Educational Institution`

**SubscriptionTier**

* `basic`, `pro`, `business`

**SubscriptionStatus**

* `active`, `canceled`, `expired`, `suspended`

**AgentStatus.status**

* `healthy`, `degraded`, `unhealthy`, `offline`

**Skill match `match_type`**

* `exact`, `partial`, `similar`

**Core objects you’ll interact with frequently**

* `SearchRequest`
* `SearchResults`
* `SearchReport`
* `AggregationResult`
* `AgentStatus`
* `AgentHealthCheck`
* `SubscriptionResponse`

All shapes are exactly as in your dump. When building clients, generate types from `/openapi.json`.

---

## 14) Integration recipes

### 14.1 Typical “end-to-end” search

1. Login → get `access_token` and `session_id`
2. Option A — leverage existing DB first:

   * `POST /api/v1/search/search` with `search_mode=database`
   * If results thin → refine or switch to `hybrid`
3. Option B — expand your DB first:

   * `POST /api/v1/core-signal/search-talents` to get IDs
   * `POST /api/v1/core-signal/fetch-talent-details` with those IDs
   * Poll `/api/v1/core-signal/search-status/{search_id}` until done
   * Then `POST /api/v1/search/search` with `search_mode=database`
4. Save and later retrieve results:

   * `GET /api/v1/search/search/{search_id}?user_id=...`
5. Generate report:

   * `GET /api/v1/search/search/{search_id}/report?user_id=...`

### 14.2 Refinement loop

* Start with broader `job_titles` and `skills_keywords`
* Use response fields:

  * `missing_skills`, `ranking_explanation`, `recommendations`
* Call `POST /api/v1/search/search/{search_id}/refine` with updated `criteria`
* Keep `max_results` ≤ 200

### 14.3 Cache hygiene

* `GET /api/v1/cache/history` to list
* `DELETE /api/v1/cache/history/{search_id}` or bulk clear
* Admin can monitor with `GET /api/v1/cache/statistics` then `POST /api/v1/cache/cleanup`

### 14.4 Agent fleet ops

* Fleet health: `GET /api/v1/agents/agents/status`
* Deep check: `POST /api/v1/agents/agents/health-check`
* Metrics: `GET /api/v1/agents/agents/metrics?agent_name=&time_range=24h`
* Restart one: `POST /api/v1/agents/agents/{agent_name}/restart`
* Logs: `GET /api/v1/agents/agents/logs?level=INFO&limit=200`

---

## 15) Request examples

### 15.1 Search — hybrid with details on

```bash
curl -X POST "$BASE_URL/api/v1/search/search" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{
    "user_id":"u_1",
    "session_id":"s_1",
    "search_mode":"hybrid",
    "criteria":{
      "job_titles":["AI Researcher","ML Engineer"],
      "skills_keywords":["python","pytorch","rl"],
      "location_full":"Nairobi, Kenya",
      "location_country":"Kenya","location_country_iso2":"KE",
      "experience_years_min":3,"experience_years_max":10,
      "management_level":"Specialist",
      "department":"Engineering and Technical",
      "company_type":"Startup",
      "exclude_keywords":["intern"]
    },
    "max_results":100,
    "include_detailed_profiles":true,
    "save_search":true,
    "search_description":"East Africa RL talent"
  }'
```

### 15.2 Generate a report

```bash
curl "$BASE_URL/api/v1/search/search/$SEARCH_ID/report?user_id=$USER_ID" \
  -H "Authorization: Bearer $TOKEN"
```

### 15.3 Core Signal — search, fetch, poll

```bash
# 1) search for IDs
curl -X POST "$BASE_URL/api/v1/core-signal/search-talents" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{ "job_titles":["AI ENGINEER"],"location_country":"Ghana","location_full":"Accra",
        "skills_keywords":["python","tensorflow"] }'

# 2) then fetch details by IDs
curl -X POST "$BASE_URL/api/v1/core-signal/fetch-talent-details" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '[123,456,789]'

# 3) poll status
curl "$BASE_URL/api/v1/core-signal/search-status/42" -H "Authorization: Bearer $TOKEN"
```

### 15.4 Chat

```bash
curl -X POST "$BASE_URL/api/v1/chat/chat?message=Summarize%20my%20last%205%20searches&temperature=0.4" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 16) Validation rules you can rely on

* `max_results` in SearchRequest: 1 to 200, default 50
* Pagination `limit`:

  * search history default 20, max 100
  * talents default 100, max 1000
* `time_range` for agent metrics: `1h`, `24h`, `7d`
* Enum fields must match exactly (see section 13)

**Common 422 causes**

* Enum value typo
* `max_results` out of range
* Missing required query params like `user_id` on get-by-search\_id
* Malformed body or wrong `Content-Type`

---

## 17) Security notes

* Treat all `/api/v1/*` except public health/test as protected.
* Use HTTPS only.
* Store refresh tokens securely server-side if doing a backend-for-frontend pattern.
* Admin-only endpoints are marked, but enforcement is server-side RBAC.

---

## 18) Rate limits & idempotency

* Rate limiting not specified in spec. Assume standard 429 on overuse.
* Idempotency not specified. For potentially repeatable POSTs from clients that may retry, build client-side guards (don’t spam restart, collect, cancel).

---

## 19) Versioning

* Current documented surface is under `/api/v1/...` and legacy `/v1/auth/...`.
* Track breaking changes through `/openapi.json` and pin SDKs to this schema.

---

## 20) Quick endpoint index

### Public health

* `GET /health`
* `GET /`

### Auth (new)

* `POST /api/v1/auths/login`
* `POST /api/v1/auths/logout`
* `POST /api/v1/auths/refresh?refresh_token=...`
* `GET /api/v1/auths/me`
* `DELETE /api/v1/auths/me`

### Users

* `POST /api/v1/users/`
* `GET /api/v1/users/users/{user_id}`
* `PUT /api/v1/users/{user_id}`
* `POST /api/v1/users/create-email-otp`
* `POST /api/v1/users/verify-email`
* `POST /api/v1/users/resend-verification`
* `POST /api/v1/users/reset-password-request`
* `POST /api/v1/users/reset-password-verify`
* `GET /api/v1/users/by-phone/{phone}`

### Subscriptions

* `POST /api/v1/subscriptions/`
* `GET /api/v1/subscriptions/me`
* `GET /api/v1/subscriptions/me/history`
* `PUT /api/v1/subscriptions/{subscription_id}`
* `POST /api/v1/subscriptions/{subscription_id}/cancel`
* `GET /api/v1/subscriptions/subscriptions/{subscription_id}`

### Search service

* `GET /api/v1/search/test`
* `GET /api/v1/search/test-simple`
* `POST /api/v1/search/search/simple-mock`
* `POST /api/v1/search/search`
* `GET /api/v1/search/search/{search_id}`
* `POST /api/v1/search/search/{search_id}/refine`
* `GET /api/v1/search/search/{search_id}/report`
* `GET /api/v1/search/search/history`

### Core Signal

* `GET /api/v1/core-signal/`
* `POST /api/v1/core-signal/search-talents`
* `POST /api/v1/core-signal/fetch-talent-details`
* `GET /api/v1/core-signal/search-status/{search_id}`
* `GET /api/v1/core-signal/talents`
* `GET /api/v1/core-signal/talents/{talent_id}`
* `DELETE /api/v1/core-signal/talents/{talent_id}`
* `POST /api/v1/core-signal/collect-by-id/{talent_id}`
* `POST /api/v1/core-signal/collect-by-shorthand-name?linkedin_url=...`
* `POST /api/v1/core-signal/search-database`
* `GET /api/v1/core-signal/search-database/by-linkedin?linkedin_url=...`
* `GET /api/v1/core-signal/search-history`

### Cache

* `GET /api/v1/cache/history`
* `DELETE /api/v1/cache/history`
* `GET /api/v1/cache/history/{search_id}`
* `DELETE /api/v1/cache/history/{search_id}`
* `GET /api/v1/cache/statistics` (admin)
* `POST /api/v1/cache/cleanup`
* `GET /api/v1/cache/cache-info`

### Agents

* `GET /api/v1/agents/agents/status`
* `GET /api/v1/agents/agents/{agent_name}/status`
* `POST /api/v1/agents/agents/health-check`
* `GET /api/v1/agents/agents/metrics?agent_name=&time_range=1h`
* `POST /api/v1/agents/agents/{agent_name}/restart`
* `GET /api/v1/agents/agents/logs?level=INFO&limit=100&offset=0`
* `POST /api/v1/agents/agents/config`
* `GET /api/v1/agents/agents/workflows?user_id=`

### Monitoring

* `GET /api/v1/monitoring/health`
* `GET /api/v1/monitoring/metrics?time_window_hours=1`
* `GET /api/v1/monitoring/metrics/performance?operation=&time_window_hours=1`
* `GET /api/v1/monitoring/alerts?active_only=true`
* `POST /api/v1/monitoring/alerts/{alert_name}/clear`
* `GET /api/v1/monitoring/system/status`
* `GET /api/v1/monitoring/logs` (listed, body unspecified)

### Legacy auth

* `POST /v1/auth/login`
* `POST /v1/auth/logout`
* `POST /v1/auth/refresh?refresh_token=...`
* `GET /v1/auth/me`
* `DELETE /v1/auth/me`

---

## 21) Testing checklist

* Can call `/api/v1/search/test` without auth
* Auth flow works end-to-end: login → me → refresh → logout
* Search works with each `search_mode`
* Refine returns different `search_id` or updated results
* Report endpoint returns `aggregation_result` with scores
* Core Signal pipeline: search-talents → fetch-talent-details → status polls to completion
* Agents: status OK, restart returns success, metrics query valid ranges
* Subscriptions lifecycle: create → get → update → cancel → history
* Cache operations respect user scope