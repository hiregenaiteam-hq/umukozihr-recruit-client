# API Integration Guidelines

## Overview
HireGen integrates with a comprehensive HR Talent Agent System API that provides AI-powered talent sourcing, candidate management, and intelligent search capabilities.

## API Architecture
- **Base URL**: `https://agent-architecture.onrender.com/`
- **API Version**: v1 (OpenAPI 3.1 specification)
- **Authentication**: Bearer token with automatic refresh
- **Content Type**: `application/json` (except auth endpoints use form-encoded)
- **Time Format**: ISO 8601 with timezone (e.g., `2025-08-08T12:31:07Z`)

## Core Services

### Authentication Service (`/api/v1/auths/`)
- **Login**: `POST /login` (form-encoded: grant_type=password)
- **Logout**: `POST /logout`
- **Refresh**: `POST /refresh?refresh_token=<token>`
- **Profile**: `GET /me`, `DELETE /me`

### Search Service (`/api/v1/search/`)
- **Execute Search**: `POST /search` (supports database/live/hybrid modes)
- **Get Results**: `GET /search/{search_id}?user_id=<user>`
- **Refine Search**: `POST /search/{search_id}/refine`
- **Generate Report**: `GET /search/{search_id}/report?user_id=<user>`
- **Search History**: `GET /search/history?user_id=<user>&limit=20&offset=0`

### Core Signal Service (`/api/v1/core-signal/`)
- **Search Talents**: `POST /search-talents` (returns talent IDs)
- **Fetch Details**: `POST /fetch-talent-details` (bulk profile fetching)
- **Check Status**: `GET /search-status/{search_id}`
- **Browse Talents**: `GET /talents?skip=0&limit=100`
- **Get Profile**: `GET /talents/{talent_id}`
- **Database Search**: `POST /search-database`

### Chat Service (`/api/v1/chat/`)
- **Send Message**: `POST /chat?message=<msg>&session_id=<id>&temperature=0.7`
- **Chat History**: `GET /chat/history?session_id=<id>&limit=50&offset=0`
- **Chat Sessions**: `GET /chat/sessions?limit=20&offset=0`
- **Analyze Search**: `POST /chat/analyze-search?analysis_type=patterns&time_range=30d`

## Search Modes
- **database**: Query internal database only
- **live**: Live sources (LinkedIn, etc.)
- **hybrid**: Both database and live sources

## Key Enums and Values

### Management Levels
`Intern`, `Specialist`, `Senior Specialist`, `Team Lead`, `Manager`, `Senior Manager`, `Director`, `VP`, `C-Level`

### Departments
`Engineering and Technical`, `Sales`, `Marketing`, `Human Resources`, `Finance`, `Operations`, `Product`, `Design`, `Legal`, `Other`

### Company Types
`Startup`, `Privately Held`, `Public Company`, `Nonprofit`, `Government Agency`, `Educational Institution`

### Subscription Tiers
`basic`, `pro`, `business`

## Error Handling Patterns

### HTTP Status Codes
- **200**: Success
- **201**: Created (subscriptions)
- **204**: No Content (deletions)
- **401/403**: Authentication/Authorization errors
- **422**: Validation errors with detailed field information
- **429**: Rate limiting (implement client-side queuing)

### Validation Error Format
```json
{
  "detail": [
    {
      "loc": ["field_name"],
      "msg": "Error message",
      "type": "error_type"
    }
  ]
}
```

## Request/Response Patterns

### Search Request Structure
```json
{
  "user_id": "string",
  "session_id": "string",
  "search_mode": "database|live|hybrid",
  "criteria": {
    "job_titles": ["string"],
    "skills_keywords": ["string"],
    "location_full": "string",
    "location_country": "string",
    "experience_years_min": 0,
    "experience_years_max": 0,
    "management_level": "Specialist",
    "department": "Engineering and Technical",
    "company_type": "Startup",
    "is_currently_employed": true,
    "exclude_keywords": ["string"]
  },
  "max_results": 50,
  "include_detailed_profiles": false,
  "save_search": true,
  "search_description": "string"
}
```

### Pagination Parameters
- **limit**: Default 20, max varies by endpoint (search: 100, talents: 1000)
- **offset**: Default 0, minimum 0
- **skip**: Alternative to offset for some endpoints

## Authentication Flow
1. Login with credentials → receive access_token + refresh_token
2. Include `Authorization: Bearer <access_token>` in all requests
3. On 401 error → attempt refresh with refresh_token
4. If refresh fails → redirect to login
5. Store tokens securely (access in memory, refresh in httpOnly cookies)

## Progressive Enhancement Strategy

### Feature Flags
- `USE_LIVE_API`: Toggle between mock and live API
- `CHAT_AGENT_ENABLED`: Enable/disable chat functionality
- `CORE_SIGNAL_ENABLED`: Enable/disable LinkedIn integration
- `MONITORING_ENABLED`: Enable/disable system monitoring

### Mock Data Fallbacks
- Maintain identical interfaces between mock and live data
- Support seamless switching via environment variables
- Provide rich mock data for development and testing

## Performance Considerations

### Request Optimization
- **Debouncing**: Search requests (300ms delay)
- **Deduplication**: Prevent duplicate simultaneous requests
- **Caching**: Cache responses with appropriate TTL
- **Pagination**: Use virtual scrolling for large result sets
- **Retry Logic**: Exponential backoff for failed requests

### Response Handling
- **Streaming**: Handle large responses progressively
- **Compression**: Enable gzip/brotli compression
- **Selective Loading**: Only fetch required fields
- **Background Updates**: Refresh data without blocking UI

## Security Guidelines

### Token Management
- Access tokens: Store in memory only (never localStorage)
- Refresh tokens: Use httpOnly cookies or secure storage
- Token rotation: Refresh tokens on each use
- Automatic cleanup: Clear tokens on logout/tab close

### Request Security
- HTTPS only for all API communication
- CSRF protection via custom headers
- Input validation and sanitization
- Rate limiting awareness and client-side queuing

## Integration Recipes

### Typical Search Flow
1. `POST /api/v1/search/search` with criteria
2. Poll or wait for completion
3. `GET /api/v1/search/search/{search_id}` for results
4. Optional: `POST /api/v1/search/search/{search_id}/refine` for refinements
5. Optional: `GET /api/v1/search/search/{search_id}/report` for analysis

### Core Signal Expansion Flow
1. `POST /api/v1/core-signal/search-talents` to get talent IDs
2. `POST /api/v1/core-signal/fetch-talent-details` with IDs
3. Poll `GET /api/v1/core-signal/search-status/{search_id}` until complete
4. Use `POST /api/v1/search/search` with database mode for enriched results

### Chat Integration Flow
1. Check `CHAT_AGENT_ENABLED` feature flag
2. If disabled: Show "Coming Soon" with mock responses
3. If enabled: `POST /api/v1/chat/chat` with message
4. Handle different response types: chat, search_analysis, talent_details
5. Display suggested actions and maintain session continuity

## Testing Strategies

### Mock API Client
- Implement identical interfaces to live API
- Support error scenarios and edge cases
- Configurable delays and response variations
- Rich mock data matching real API responses

### Environment Configuration
```bash
# Development with mocks
NEXT_PUBLIC_USE_LIVE_API=false
NEXT_PUBLIC_CHAT_AGENT_ENABLED=false

# Staging with live API
NEXT_PUBLIC_USE_LIVE_API=true
NEXT_PUBLIC_CHAT_AGENT_ENABLED=true

# Production
NEXT_PUBLIC_API_BASE_URL=https://agent-architecture.onrender.com
NEXT_PUBLIC_USE_LIVE_API=true
```

This integration approach ensures robust, scalable, and maintainable API connectivity while supporting progressive enhancement and seamless development workflows.