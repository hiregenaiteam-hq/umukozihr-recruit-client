HR Talent Agent System
 1.0.0 
OAS 3.1
/openapi.json
AI-powered talent sourcing system using multi-agent workflows


Authorize
search


GET
/api/v1/search/test
Test Endpoint

Simple test endpoint that doesn't require external dependencies. Use this to verify the API is working.

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "additionalProp1": {}
}
No links

POST
/api/v1/search/search/simple-mock
Simple Mock Search

Simple mock search endpoint that returns basic JSON. This bypasses all complex model validation issues.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "user_id": "string",
  "session_id": "string",
  "search_mode": "database",
  "criteria": {
    "job_titles": [
      "string"
    ],
    "skills_keywords": [
      "string"
    ],
    "location_full": "string",
    "location_country": "string",
    "location_country_iso2": "string",
    "experience_years_min": 0,
    "experience_years_max": 0,
    "management_level": "Intern",
    "department": "Engineering and Technical",
    "company_type": "Startup",
    "company_size_min": 0,
    "company_size_max": 0,
    "is_currently_employed": true,
    "exclude_keywords": [
      "string"
    ]
  },
  "max_results": 50,
  "include_detailed_profiles": false,
  "save_search": true,
  "search_description": "string"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/search/search
Search Talents

Execute talent search using specified mode (database, live, or hybrid).

Args: search_request: Search request with criteria and configuration background_tasks: FastAPI background tasks request: FastAPI request object for session extraction db: Database session

Returns: SearchResults with results and metadata

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "user_id": "string",
  "session_id": "string",
  "search_mode": "database",
  "criteria": {
    "job_titles": [
      "string"
    ],
    "skills_keywords": [
      "string"
    ],
    "location_full": "string",
    "location_country": "string",
    "location_country_iso2": "string",
    "experience_years_min": 0,
    "experience_years_max": 0,
    "management_level": "Intern",
    "department": "Engineering and Technical",
    "company_type": "Startup",
    "company_size_min": 0,
    "company_size_max": 0,
    "is_currently_employed": true,
    "exclude_keywords": [
      "string"
    ]
  },
  "max_results": 50,
  "include_detailed_profiles": false,
  "save_search": true,
  "search_description": "string"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "search_id": "string",
  "user_id": "string",
  "search_request": {
    "user_id": "string",
    "session_id": "string",
    "search_mode": "database",
    "criteria": {
      "job_titles": [
        "string"
      ],
      "skills_keywords": [
        "string"
      ],
      "location_full": "string",
      "location_country": "string",
      "location_country_iso2": "string",
      "experience_years_min": 0,
      "experience_years_max": 0,
      "management_level": "Intern",
      "department": "Engineering and Technical",
      "company_type": "Startup",
      "company_size_min": 0,
      "company_size_max": 0,
      "is_currently_employed": true,
      "exclude_keywords": [
        "string"
      ]
    },
    "max_results": 50,
    "include_detailed_profiles": false,
    "save_search": true,
    "search_description": "string"
  },
  "results": [
    {
      "id": 0,
      "full_name": "string",
      "headline": "string",
      "linkedin_url": "string",
      "picture_url": "string",
      "primary_professional_email": "string",
      "location_full": "string",
      "location_country": "string",
      "active_experience_title": "string",
      "inferred_skills": [
        "string"
      ],
      "total_experience_duration_months": 0,
      "is_working": true,
      "relevance_score": 0,
      "skill_match_score": 0,
      "experience_score": 0,
      "location_score": 0,
      "ranking_explanation": "string",
      "matched_skills": [
        "string"
      ],
      "missing_skills": [
        "string"
      ],
      "key_achievements": [
        "string"
      ],
      "relevant_experience": [
        "string"
      ],
      "certifications": [
        "string"
      ],
      "education_summary": "",
      "career_progression": "",
      "experience": [
        {
          "active_experience": true,
          "position_title": "string",
          "department": "string",
          "management_level": "string",
          "location": "string",
          "description": "string",
          "date_from": "string",
          "date_from_year": 0,
          "date_from_month": 0,
          "date_to": "string",
          "date_to_year": 0,
          "date_to_month": 0,
          "duration_months": 0,
          "company_name": "string",
          "company_id": 0,
          "company_type": "string",
          "company_size_range": "string",
          "company_employees_count": 0,
          "company_industry": "string",
          "company_website": "string",
          "company_linkedin_url": "string",
          "company_hq_country": "string",
          "company_hq_city": "string",
          "order_in_profile": 0
        }
      ],
      "education": [
        {
          "degree": "string",
          "description": "string",
          "institution_name": "string",
          "institution_url": "string",
          "institution_country_iso2": "string",
          "institution_city": "string",
          "date_from_year": 0,
          "date_to_year": 0,
          "activities_and_societies": "string",
          "order_in_profile": 0
        }
      ],
      "certification_details": [
        {
          "title": "string",
          "issuer": "string",
          "issuer_url": "string",
          "credential_id": "string",
          "certificate_url": "string",
          "date_from": "string",
          "date_from_year": 0,
          "date_from_month": 0,
          "date_to": "string",
          "date_to_year": 0,
          "date_to_month": 0,
          "order_in_profile": 0
        }
      ]
    }
  ],
  "total_results": 0,
  "search_duration": 0,
  "timestamp": "2025-08-08T12:31:07.380Z",
  "search_summary": "string",
  "recommendations": [
    "string"
  ]
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/search/search/{search_id}
Get Search Results

Retrieve previously executed search results.

Args: search_id: Search identifier user_id: User ID for authorization request: FastAPI request object for session validation db: Database session

Returns: SearchResults with cached results

Parameters
Try it out
Name	Description
search_id *
string
(path)
search_id
user_id *
string
(query)
User ID for authorization

user_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "search_id": "string",
  "user_id": "string",
  "search_request": {
    "user_id": "string",
    "session_id": "string",
    "search_mode": "database",
    "criteria": {
      "job_titles": [
        "string"
      ],
      "skills_keywords": [
        "string"
      ],
      "location_full": "string",
      "location_country": "string",
      "location_country_iso2": "string",
      "experience_years_min": 0,
      "experience_years_max": 0,
      "management_level": "Intern",
      "department": "Engineering and Technical",
      "company_type": "Startup",
      "company_size_min": 0,
      "company_size_max": 0,
      "is_currently_employed": true,
      "exclude_keywords": [
        "string"
      ]
    },
    "max_results": 50,
    "include_detailed_profiles": false,
    "save_search": true,
    "search_description": "string"
  },
  "results": [
    {
      "id": 0,
      "full_name": "string",
      "headline": "string",
      "linkedin_url": "string",
      "picture_url": "string",
      "primary_professional_email": "string",
      "location_full": "string",
      "location_country": "string",
      "active_experience_title": "string",
      "inferred_skills": [
        "string"
      ],
      "total_experience_duration_months": 0,
      "is_working": true,
      "relevance_score": 0,
      "skill_match_score": 0,
      "experience_score": 0,
      "location_score": 0,
      "ranking_explanation": "string",
      "matched_skills": [
        "string"
      ],
      "missing_skills": [
        "string"
      ],
      "key_achievements": [
        "string"
      ],
      "relevant_experience": [
        "string"
      ],
      "certifications": [
        "string"
      ],
      "education_summary": "",
      "career_progression": "",
      "experience": [
        {
          "active_experience": true,
          "position_title": "string",
          "department": "string",
          "management_level": "string",
          "location": "string",
          "description": "string",
          "date_from": "string",
          "date_from_year": 0,
          "date_from_month": 0,
          "date_to": "string",
          "date_to_year": 0,
          "date_to_month": 0,
          "duration_months": 0,
          "company_name": "string",
          "company_id": 0,
          "company_type": "string",
          "company_size_range": "string",
          "company_employees_count": 0,
          "company_industry": "string",
          "company_website": "string",
          "company_linkedin_url": "string",
          "company_hq_country": "string",
          "company_hq_city": "string",
          "order_in_profile": 0
        }
      ],
      "education": [
        {
          "degree": "string",
          "description": "string",
          "institution_name": "string",
          "institution_url": "string",
          "institution_country_iso2": "string",
          "institution_city": "string",
          "date_from_year": 0,
          "date_to_year": 0,
          "activities_and_societies": "string",
          "order_in_profile": 0
        }
      ],
      "certification_details": [
        {
          "title": "string",
          "issuer": "string",
          "issuer_url": "string",
          "credential_id": "string",
          "certificate_url": "string",
          "date_from": "string",
          "date_from_year": 0,
          "date_from_month": 0,
          "date_to": "string",
          "date_to_year": 0,
          "date_to_month": 0,
          "order_in_profile": 0
        }
      ]
    }
  ],
  "total_results": 0,
  "search_duration": 0,
  "timestamp": "2025-08-08T12:31:07.395Z",
  "search_summary": "string",
  "recommendations": [
    "string"
  ]
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/search/search/{search_id}/refine
Refine Search

Refine an existing search with updated criteria.

Args: search_id: Original search identifier search_request: Updated search request request: FastAPI request object for session validation db: Database session

Returns: SearchResults with refined results

Parameters
Try it out
Name	Description
search_id *
string
(path)
search_id
Request body

application/json
Example Value
Schema
{
  "user_id": "string",
  "session_id": "string",
  "search_mode": "database",
  "criteria": {
    "job_titles": [
      "string"
    ],
    "skills_keywords": [
      "string"
    ],
    "location_full": "string",
    "location_country": "string",
    "location_country_iso2": "string",
    "experience_years_min": 0,
    "experience_years_max": 0,
    "management_level": "Intern",
    "department": "Engineering and Technical",
    "company_type": "Startup",
    "company_size_min": 0,
    "company_size_max": 0,
    "is_currently_employed": true,
    "exclude_keywords": [
      "string"
    ]
  },
  "max_results": 50,
  "include_detailed_profiles": false,
  "save_search": true,
  "search_description": "string"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "search_id": "string",
  "user_id": "string",
  "search_request": {
    "user_id": "string",
    "session_id": "string",
    "search_mode": "database",
    "criteria": {
      "job_titles": [
        "string"
      ],
      "skills_keywords": [
        "string"
      ],
      "location_full": "string",
      "location_country": "string",
      "location_country_iso2": "string",
      "experience_years_min": 0,
      "experience_years_max": 0,
      "management_level": "Intern",
      "department": "Engineering and Technical",
      "company_type": "Startup",
      "company_size_min": 0,
      "company_size_max": 0,
      "is_currently_employed": true,
      "exclude_keywords": [
        "string"
      ]
    },
    "max_results": 50,
    "include_detailed_profiles": false,
    "save_search": true,
    "search_description": "string"
  },
  "results": [
    {
      "id": 0,
      "full_name": "string",
      "headline": "string",
      "linkedin_url": "string",
      "picture_url": "string",
      "primary_professional_email": "string",
      "location_full": "string",
      "location_country": "string",
      "active_experience_title": "string",
      "inferred_skills": [
        "string"
      ],
      "total_experience_duration_months": 0,
      "is_working": true,
      "relevance_score": 0,
      "skill_match_score": 0,
      "experience_score": 0,
      "location_score": 0,
      "ranking_explanation": "string",
      "matched_skills": [
        "string"
      ],
      "missing_skills": [
        "string"
      ],
      "key_achievements": [
        "string"
      ],
      "relevant_experience": [
        "string"
      ],
      "certifications": [
        "string"
      ],
      "education_summary": "",
      "career_progression": "",
      "experience": [
        {
          "active_experience": true,
          "position_title": "string",
          "department": "string",
          "management_level": "string",
          "location": "string",
          "description": "string",
          "date_from": "string",
          "date_from_year": 0,
          "date_from_month": 0,
          "date_to": "string",
          "date_to_year": 0,
          "date_to_month": 0,
          "duration_months": 0,
          "company_name": "string",
          "company_id": 0,
          "company_type": "string",
          "company_size_range": "string",
          "company_employees_count": 0,
          "company_industry": "string",
          "company_website": "string",
          "company_linkedin_url": "string",
          "company_hq_country": "string",
          "company_hq_city": "string",
          "order_in_profile": 0
        }
      ],
      "education": [
        {
          "degree": "string",
          "description": "string",
          "institution_name": "string",
          "institution_url": "string",
          "institution_country_iso2": "string",
          "institution_city": "string",
          "date_from_year": 0,
          "date_to_year": 0,
          "activities_and_societies": "string",
          "order_in_profile": 0
        }
      ],
      "certification_details": [
        {
          "title": "string",
          "issuer": "string",
          "issuer_url": "string",
          "credential_id": "string",
          "certificate_url": "string",
          "date_from": "string",
          "date_from_year": 0,
          "date_from_month": 0,
          "date_to": "string",
          "date_to_year": 0,
          "date_to_month": 0,
          "order_in_profile": 0
        }
      ]
    }
  ],
  "total_results": 0,
  "search_duration": 0,
  "timestamp": "2025-08-08T12:31:07.413Z",
  "search_summary": "string",
  "recommendations": [
    "string"
  ]
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/search/search/{search_id}/report
Get Search Report

Generate or retrieve comprehensive search report.

Args: search_id: Search identifier user_id: User ID for authorization db: Database session

Returns: SearchReport with detailed analysis

Parameters
Try it out
Name	Description
search_id *
string
(path)
search_id
user_id *
string
(query)
User ID for authorization

user_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "report_id": "string",
  "search_id": "string",
  "user_id": "string",
  "executive_summary": "string",
  "key_findings": [
    "string"
  ],
  "aggregation_result": {
    "search_id": "string",
    "user_id": "string",
    "session_id": "string",
    "search_criteria_summary": "string",
    "total_results": 0,
    "database_results_count": 0,
    "live_search_results_count": 0,
    "ranked_profiles": [
      {
        "profile": {
          "id": 0,
          "parent_id": 0,
          "full_name": "string",
          "first_name": "string",
          "last_name": "string",
          "headline": "string",
          "summary": "string",
          "picture_url": "string",
          "linkedin_url": "string",
          "location_country": "string",
          "location_full": "string",
          "location_regions": [
            "string"
          ],
          "inferred_skills": [
            "string"
          ],
          "interests": [
            "string"
          ],
          "connections_count": 0,
          "followers_count": 0,
          "active_experience_title": "string",
          "active_experience_company_id": 0,
          "active_experience_description": "string",
          "active_experience_department": "string",
          "active_experience_management_level": "string",
          "total_experience_duration_months": 0,
          "experience": [
            {
              "active_experience": true,
              "position_title": "string",
              "department": "string",
              "management_level": "string",
              "location": "string",
              "description": "string",
              "date_from": "string",
              "date_from_year": 0,
              "date_from_month": 0,
              "date_to": "string",
              "date_to_year": 0,
              "date_to_month": 0,
              "duration_months": 0,
              "company_name": "string",
              "company_id": 0,
              "company_type": "string",
              "company_size_range": "string",
              "company_employees_count": 0,
              "company_industry": "string",
              "company_website": "string",
              "company_linkedin_url": "string",
              "company_hq_country": "string",
              "company_hq_city": "string",
              "order_in_profile": 0
            }
          ],
          "education": [
            {
              "degree": "string",
              "description": "string",
              "institution_name": "string",
              "institution_url": "string",
              "institution_country_iso2": "string",
              "institution_city": "string",
              "date_from_year": 0,
              "date_to_year": 0,
              "activities_and_societies": "string",
              "order_in_profile": 0
            }
          ],
          "certifications": [
            {
              "title": "string",
              "issuer": "string",
              "issuer_url": "string",
              "credential_id": "string",
              "certificate_url": "string",
              "date_from": "string",
              "date_from_year": 0,
              "date_from_month": 0,
              "date_to": "string",
              "date_to_year": 0,
              "date_to_month": 0,
              "order_in_profile": 0
            }
          ],
          "is_working": true,
          "is_decision_maker": true,
          "imported_at": "2025-08-08T12:31:07.429Z",
          "updated_at": "2025-08-08T12:31:07.429Z"
        },
        "rank_position": 1,
        "relevance_score": 100,
        "skill_match_score": 100,
        "experience_score": 100,
        "location_score": 100,
        "job_title_score": 100,
        "matched_skills": [
          {
            "searched_skill": "string",
            "matched_skill": "string",
            "match_score": 100,
            "match_type": "exact"
          }
        ],
        "missing_skills": [
          "string"
        ],
        "ranking_explanation": "string",
        "key_achievements": [
          "string"
        ],
        "relevant_experience": [
          "string"
        ],
        "certifications": [
          "string"
        ],
        "education_summary": "",
        "career_progression": "",
        "source_type": "database",
        "source_details": {
          "additionalProp1": {}
        }
      }
    ],
    "total_execution_time": 0,
    "database_search_time": 0,
    "live_search_time": 0,
    "ranking_time": 0,
    "average_relevance_score": 100,
    "top_score": 100,
    "score_distribution": {
      "additionalProp1": 0,
      "additionalProp2": 0,
      "additionalProp3": 0
    },
    "skill_coverage_analysis": {
      "additionalProp1": {}
    },
    "location_distribution": {
      "additionalProp1": 0,
      "additionalProp2": 0,
      "additionalProp3": 0
    },
    "recommendations": [
      "string"
    ],
    "created_at": "2025-08-08T12:31:07.429Z"
  },
  "top_candidates_analysis": "string",
  "candidate_diversity_score": 100,
  "market_insights": {
    "additionalProp1": {}
  },
  "talent_availability": "string",
  "hiring_recommendations": [
    "string"
  ],
  "search_optimization_tips": [
    "string"
  ],
  "generated_at": "2025-08-08T12:31:07.429Z",
  "report_version": "1.0"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/search/search/history
Get Search History

Get user's search history.

Args: user_id: User ID limit: Number of searches to return offset: Offset for pagination db: Database session

Returns: List of search history entries

Parameters
Try it out
Name	Description
user_id *
string
(query)
User ID

user_id
limit
integer
(query)
Number of searches to return

Default value : 20

20
maximum: 100
minimum: 1
offset
integer
(query)
Offset for pagination

Default value : 0

0
minimum: 0
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "additionalProp1": {}
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/search/test-simple
Test Simple

Completely isolated test endpoint with no dependencies.

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
agents


GET
/api/v1/agents/agents/status
Get Agents Status

Get status of all AI agents.

Returns: Dictionary of agent statuses

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "additionalProp1": {
    "name": "string",
    "status": "healthy",
    "last_activity": "2025-08-08T12:31:07.454Z",
    "total_requests": 0,
    "successful_requests": 0,
    "failed_requests": 0,
    "average_response_time": 0,
    "current_load": 0,
    "max_concurrent_requests": 0,
    "version": "string"
  },
  "additionalProp2": {
    "name": "string",
    "status": "healthy",
    "last_activity": "2025-08-08T12:31:07.454Z",
    "total_requests": 0,
    "successful_requests": 0,
    "failed_requests": 0,
    "average_response_time": 0,
    "current_load": 0,
    "max_concurrent_requests": 0,
    "version": "string"
  },
  "additionalProp3": {
    "name": "string",
    "status": "healthy",
    "last_activity": "2025-08-08T12:31:07.454Z",
    "total_requests": 0,
    "successful_requests": 0,
    "failed_requests": 0,
    "average_response_time": 0,
    "current_load": 0,
    "max_concurrent_requests": 0,
    "version": "string"
  }
}
No links

GET
/api/v1/agents/agents/{agent_name}/status
Get Agent Status

Get status of a specific agent.

Args: agent_name: Name of the agent

Returns: AgentStatus for the specified agent

Parameters
Try it out
Name	Description
agent_name *
string
(path)
agent_name
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "name": "string",
  "status": "healthy",
  "last_activity": "2025-08-08T12:31:07.463Z",
  "total_requests": 0,
  "successful_requests": 0,
  "failed_requests": 0,
  "average_response_time": 0,
  "current_load": 0,
  "max_concurrent_requests": 0,
  "version": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/agents/agents/health-check
Perform Health Check

Perform comprehensive health check on all agents.

Returns: AgentHealthCheck with detailed health information

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "overall_status": "healthy",
  "timestamp": "2025-08-08T12:31:07.468Z",
  "total_agents": 0,
  "healthy_agents": 0,
  "unhealthy_agents": 0,
  "check_duration": 0,
  "agent_details": {
    "additionalProp1": {
      "additionalProp1": {}
    },
    "additionalProp2": {
      "additionalProp1": {}
    },
    "additionalProp3": {
      "additionalProp1": {}
    }
  },
  "system_info": {
    "additionalProp1": {}
  }
}
No links

GET
/api/v1/agents/agents/metrics
Get Agent Metrics

Get performance metrics for agents.

Args: agent_name: Optional specific agent name time_range: Time range for metrics

Returns: Dictionary of agent metrics

Parameters
Try it out
Name	Description
agent_name
string | (string | null)
(query)
Specific agent name

agent_name
time_range
string
(query)
Time range for metrics (1h, 24h, 7d)

Default value : 1h

1h
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "additionalProp1": {}
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/agents/agents/{agent_name}/restart
Restart Agent

Restart a specific agent.

Args: agent_name: Name of the agent to restart

Returns: Success message

Parameters
Try it out
Name	Description
agent_name *
string
(path)
agent_name
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/agents/agents/logs
Get Agent Logs

Get agent logs.

Args: agent_name: Optional specific agent name level: Log level filter limit: Number of log entries offset: Offset for pagination

Returns: List of log entries

Parameters
Try it out
Name	Description
agent_name
string | (string | null)
(query)
Specific agent name

agent_name
level
string
(query)
Log level filter

Default value : INFO

INFO
limit
integer
(query)
Number of log entries

Default value : 100

100
maximum: 1000
minimum: 1
offset
integer
(query)
Offset for pagination

Default value : 0

0
minimum: 0
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "additionalProp1": {}
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/agents/agents/config
Update Agent Config

Update agent configuration.

Args: config_updates: Configuration updates

Returns: Updated configuration

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "additionalProp1": {}
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "additionalProp1": {}
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/agents/agents/workflows
Get Active Workflows

Get currently active agent workflows.

Args: user_id: Optional user ID filter

Returns: List of active workflows

Parameters
Try it out
Name	Description
user_id
string | (string | null)
(query)
Filter by user ID

user_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "additionalProp1": {}
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links
monitoring


GET
/api/v1/monitoring/health
Health Check

Comprehensive health check endpoint.

Returns: Health status of all system components

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links

GET
/api/v1/monitoring/metrics
Get Metrics

Get system metrics.

Args: time_window_hours: Time window for metrics in hours session_id: Current session ID

Returns: System metrics summary

Parameters
Try it out
Name	Description
time_window_hours
integer
(query)
Default value : 1

1
maximum: 24
minimum: 1
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/monitoring/metrics/performance
Get Performance Metrics

Get performance metrics for specific operations.

Args: operation: Specific operation to filter by time_window_hours: Time window for metrics in hours session_id: Current session ID

Returns: Performance metrics

Parameters
Try it out
Name	Description
operation
string | (string | null)
(query)
operation
time_window_hours
integer
(query)
Default value : 1

1
maximum: 24
minimum: 1
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/monitoring/alerts
Get Alerts

Get system alerts.

Args: active_only: Whether to return only active alerts user_id: Current user ID

Returns: System alerts

Parameters
Try it out
Name	Description
active_only
boolean
(query)
Default value : true


true
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/monitoring/alerts/{alert_name}/clear
Clear Alert

Clear a specific alert.

Args: alert_name: Name of the alert to clear user_id: Current user ID

Returns: Success status

Parameters
Try it out
Name	Description
alert_name *
string
(path)
alert_name
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/monitoring/system/status
Get System Status

Get comprehensive system status.

Args: session_id: Current session ID

Returns: System status information

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links

GET
/api/v1/monitoring/logs
Get Logs

users


POST
/api/v1/users/
Create User


GET
/api/v1/users/users/{user_id}
Get User


PUT
/api/v1/users/{user_id}
Update User

Parameters
Try it out
Name	Description
user_id *
string
(path)
user_id
Request body

application/json
Example Value
Schema
{
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2025-08-08T12:31:07.557Z"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/users/reset-password-request
Request Password Reset

Request a password reset by sending an OTP to the user's email.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "user@example.com"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/users/reset-password-verify
Verify Password Reset

Verify the password reset OTP and update the user's password.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "user@example.com",
  "otp": "string",
  "current_password": "string",
  "new_password": "stringst",
  "confirm_password": "string"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/users/create-email-otp
Create Email Otp

Create and send an email verification OTP.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "user@example.com"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/users/verify-email
Verify Email

Verify an email using OTP.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "user@example.com",
  "otp": "string"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/users/resend-verification
Resend Verification

Resend a verification email.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "user@example.com"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/users/by-phone/{phone}
Get User By Phone

Get user and subscription details by phone number.

Parameters
Try it out
Name	Description
phone *
string
(path)
phone
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2025-08-08T12:31:07.602Z",
  "subscription": {
    "additionalProp1": {}
  }
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links
authentications


POST
/api/v1/auths/login
Login

Parameters
Try it out
No parameters

Request body

application/x-www-form-urlencoded
grant_type
string | (string | null)
pattern: ^password$
username *
string
password *
string($password)
scope
string
client_id
string | (string | null)
client_secret
string | (string | null)($password)
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2025-08-08T12:31:07.614Z",
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "bearer",
  "session_id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/auths/logout
Logout


Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links

POST
/api/v1/auths/refresh
Refresh Token

Parameters
Try it out
Name	Description
refresh_token *
string
(query)
refresh_token
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2025-08-08T12:31:07.626Z",
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "bearer",
  "session_id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/auths/me
Read Users Me


Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2025-08-08T12:31:07.631Z"
}
No links

DELETE
/api/v1/auths/me
Delete Account


Delete the current user's account and all associated data.

Parameters
Try it out
No parameters

Responses
Code	Description	Links
204	
Successful Response

No links
subscriptions


POST
/api/v1/subscriptions/
Create Subscription


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "tier": "basic",
  "is_auto_renew": false
}
Responses
Code	Description	Links
201	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "tier": "string",
  "is_auto_renew": true,
  "price_per_month": 0,
  "start_date": "2025-08-08T12:31:07.637Z",
  "end_date": "2025-08-08T12:31:07.637Z",
  "last_payment_date": "2025-08-08T12:31:07.637Z",
  "next_payment_date": "2025-08-08T12:31:07.637Z",
  "created_at": "2025-08-08T12:31:07.637Z",
  "updated_at": "2025-08-08T12:31:07.637Z"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/subscriptions/me
Get My Subscription


Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "tier": "string",
  "is_auto_renew": true,
  "price_per_month": 0,
  "start_date": "2025-08-08T12:31:07.644Z",
  "end_date": "2025-08-08T12:31:07.644Z",
  "last_payment_date": "2025-08-08T12:31:07.644Z",
  "next_payment_date": "2025-08-08T12:31:07.644Z",
  "created_at": "2025-08-08T12:31:07.644Z",
  "updated_at": "2025-08-08T12:31:07.644Z"
}
No links

GET
/api/v1/subscriptions/me/history
Get My Subscription History


Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": "string",
    "tier": "string",
    "is_auto_renew": true,
    "price_per_month": 0,
    "start_date": "2025-08-08T12:31:07.647Z",
    "end_date": "2025-08-08T12:31:07.647Z",
    "last_payment_date": "2025-08-08T12:31:07.647Z",
    "next_payment_date": "2025-08-08T12:31:07.647Z",
    "created_at": "2025-08-08T12:31:07.647Z",
    "updated_at": "2025-08-08T12:31:07.647Z"
  }
]
No links

PUT
/api/v1/subscriptions/{subscription_id}
Update Subscription


Parameters
Try it out
Name	Description
subscription_id *
string
(path)
subscription_id
Request body

application/json
Example Value
Schema
{
  "tier": "basic",
  "status": "active",
  "is_auto_renew": true
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "tier": "string",
  "is_auto_renew": true,
  "price_per_month": 0,
  "start_date": "2025-08-08T12:31:07.653Z",
  "end_date": "2025-08-08T12:31:07.653Z",
  "last_payment_date": "2025-08-08T12:31:07.653Z",
  "next_payment_date": "2025-08-08T12:31:07.653Z",
  "created_at": "2025-08-08T12:31:07.653Z",
  "updated_at": "2025-08-08T12:31:07.653Z"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/subscriptions/{subscription_id}/cancel
Cancel Subscription


Parameters
Try it out
Name	Description
subscription_id *
string
(path)
subscription_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "tier": "string",
  "is_auto_renew": true,
  "price_per_month": 0,
  "start_date": "2025-08-08T12:31:07.663Z",
  "end_date": "2025-08-08T12:31:07.663Z",
  "last_payment_date": "2025-08-08T12:31:07.663Z",
  "next_payment_date": "2025-08-08T12:31:07.663Z",
  "created_at": "2025-08-08T12:31:07.663Z",
  "updated_at": "2025-08-08T12:31:07.663Z"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/subscriptions/subscriptions/{subscription_id}
Get Subscription

Parameters
Try it out
Name	Description
subscription_id *
string
(path)
subscription_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "tier": "string",
  "is_auto_renew": true,
  "price_per_month": 0,
  "start_date": "2025-08-08T12:31:07.669Z",
  "end_date": "2025-08-08T12:31:07.669Z",
  "last_payment_date": "2025-08-08T12:31:07.669Z",
  "next_payment_date": "2025-08-08T12:31:07.669Z",
  "created_at": "2025-08-08T12:31:07.669Z",
  "updated_at": "2025-08-08T12:31:07.669Z"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links
search-cache


GET
/api/v1/cache/history
Get User Search History


Get user's search history

Parameters
Try it out
Name	Description
limit
integer
(query)
Number of search history items to return

Default value : 20

20
maximum: 100
minimum: 1
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "additionalProp1": {}
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

DELETE
/api/v1/cache/history
Clear User Search History


Clear all user search history

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links

GET
/api/v1/cache/history/{search_id}
Get User Search By Id


Get specific search result from user history

Parameters
Try it out
Name	Description
search_id *
string
(path)
search_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "additionalProp1": {}
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

DELETE
/api/v1/cache/history/{search_id}
Delete User Search History


Delete a specific search result from user history

Parameters
Try it out
Name	Description
search_id *
string
(path)
search_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/cache/statistics
Get Cache Statistics


Get cache statistics (admin only)

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "additionalProp1": {}
}
No links

POST
/api/v1/cache/cleanup
Cleanup Expired Cache



GET
/api/v1/cache/cache-info
Get Cache Info


Get cache configuration and user-specific info

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "additionalProp1": {}
}
No links
extract-Profiles-from-LinkedIn


GET
/api/v1/core-signal/
Root

Health check endpoint

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links

POST
/api/v1/core-signal/search-talents
Search Talents

Search for talents based on criteria and return their IDs. The actual talent details will be fetched and saved in the background.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "job_titles": [
    "AI ENGINEER",
    "MACHINE LEARNING",
    "AI RESEARCHER"
  ],
  "location_country": "Ghana",
  "location_full": "Accra",
  "skills_keywords": [
    "python",
    "tensorflow",
    "machine learning"
  ]
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "search_id": 0,
  "talent_ids": [
    0
  ],
  "total_count": 0,
  "status": "string",
  "message": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/core-signal/fetch-talent-details
Fetch Talent Details

Fetch detailed information for specific talent IDs and save to database. This endpoint processes the request in the background.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
[
  0
]
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "search_id": 0,
  "total_ids": 0,
  "processed_count": 0,
  "successful_count": 0,
  "failed_count": 0,
  "failed_ids": [
    0
  ],
  "status": "string",
  "message": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/core-signal/search-status/{search_id}
Get Search Status

Get the status of a search/fetch operation

Parameters
Try it out
Name	Description
search_id *
integer
(path)
search_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "search_id": 0,
  "total_ids": 0,
  "processed_count": 0,
  "successful_count": 0,
  "failed_count": 0,
  "failed_ids": [
    0
  ],
  "status": "string",
  "message": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/core-signal/talents
Get Talents

Get all talent profiles with pagination

Parameters
Try it out
Name	Description
skip
integer
(query)
Number of records to skip

Default value : 0

0
minimum: 0
limit
integer
(query)
Number of records to return

Default value : 100

100
maximum: 1000
minimum: 1
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": 0,
    "full_name": "string",
    "headline": "string",
    "location_full": "string",
    "active_experience_title": "string",
    "active_experience_company_id": 0,
    "linkedin_url": "string",
    "summary": "string",
    "inferred_skills": [
      "string"
    ],
    "connections_count": 0,
    "followers_count": 0,
    "total_experience_duration_months": 0,
    "is_working": true
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/core-signal/talents/{talent_id}
Get Talent By Id

Get detailed information for a specific talent

Parameters
Try it out
Name	Description
talent_id *
integer
(path)
talent_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "parent_id": 0,
  "full_name": "string",
  "first_name": "string",
  "last_name": "string",
  "headline": "string",
  "summary": "string",
  "picture_url": "string",
  "linkedin_url": "string",
  "location_country": "string",
  "location_full": "string",
  "location_regions": [
    "string"
  ],
  "inferred_skills": [
    "string"
  ],
  "interests": [
    "string"
  ],
  "connections_count": 0,
  "followers_count": 0,
  "active_experience_title": "string",
  "active_experience_description": "string",
  "active_experience_department": "string",
  "active_experience_management_level": "string",
  "total_experience_duration_months": 0,
  "experience": [
    {
      "additionalProp1": {}
    }
  ],
  "education": [
    {
      "additionalProp1": {}
    }
  ],
  "certifications": [
    {
      "additionalProp1": {}
    }
  ],
  "is_working": true,
  "is_decision_maker": true,
  "imported_at": "2025-08-08T12:31:07.744Z"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

DELETE
/api/v1/core-signal/talents/{talent_id}
Delete Talent

Delete a talent profile

Parameters
Try it out
Name	Description
talent_id *
integer
(path)
talent_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/core-signal/search-history
Get Search History

Get search history with pagination

Parameters
Try it out
Name	Description
skip
integer
(query)
Number of records to skip

Default value : 0

0
minimum: 0
limit
integer
(query)
Number of records to return

Default value : 100

100
maximum: 1000
minimum: 1
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "additionalProp1": {}
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/core-signal/collect-by-id/{talent_id}
Collect By Id

Collect and save a talent profile by employee ID.

Parameters
Try it out
Name	Description
talent_id *
integer
(path)
talent_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "parent_id": 0,
  "full_name": "string",
  "first_name": "string",
  "last_name": "string",
  "headline": "string",
  "summary": "string",
  "picture_url": "string",
  "linkedin_url": "string",
  "location_country": "string",
  "location_full": "string",
  "location_regions": [
    "string"
  ],
  "inferred_skills": [
    "string"
  ],
  "interests": [
    "string"
  ],
  "connections_count": 0,
  "followers_count": 0,
  "active_experience_title": "string",
  "active_experience_description": "string",
  "active_experience_department": "string",
  "active_experience_management_level": "string",
  "total_experience_duration_months": 0,
  "experience": [
    {
      "additionalProp1": {}
    }
  ],
  "education": [
    {
      "additionalProp1": {}
    }
  ],
  "certifications": [
    {
      "additionalProp1": {}
    }
  ],
  "is_working": true,
  "is_decision_maker": true,
  "imported_at": "2025-08-08T12:31:07.764Z"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/core-signal/collect-by-shorthand-name
Collect By Shorthand Name

Collect and save a talent profile by LinkedIn shorthand name extracted from a URL.

Parameters
Try it out
Name	Description
linkedin_url *
string
(query)
linkedin_url
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "parent_id": 0,
  "full_name": "string",
  "first_name": "string",
  "last_name": "string",
  "headline": "string",
  "summary": "string",
  "picture_url": "string",
  "linkedin_url": "string",
  "location_country": "string",
  "location_full": "string",
  "location_regions": [
    "string"
  ],
  "inferred_skills": [
    "string"
  ],
  "interests": [
    "string"
  ],
  "connections_count": 0,
  "followers_count": 0,
  "active_experience_title": "string",
  "active_experience_description": "string",
  "active_experience_department": "string",
  "active_experience_management_level": "string",
  "total_experience_duration_months": 0,
  "experience": [
    {
      "additionalProp1": {}
    }
  ],
  "education": [
    {
      "additionalProp1": {}
    }
  ],
  "certifications": [
    {
      "additionalProp1": {}
    }
  ],
  "is_working": true,
  "is_decision_maker": true,
  "imported_at": "2025-08-08T12:31:07.771Z"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/core-signal/search-database
Search Database

Search for talents in the database based on headline keywords, skills, and location filters. Returns detailed profile information for matching talents.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "headline_keywords": "AI Engineer, Machine Learning",
  "location_country": "Ghana",
  "location_country_iso2": "GH",
  "location_full": "Accra, Greater Accra Region, Ghana",
  "skills": [
    "python",
    "tensorflow",
    "machine learning"
  ]
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": 0,
    "parent_id": 0,
    "full_name": "string",
    "first_name": "string",
    "last_name": "string",
    "headline": "string",
    "summary": "string",
    "picture_url": "string",
    "linkedin_url": "string",
    "location_country": "string",
    "location_full": "string",
    "location_regions": [
      "string"
    ],
    "inferred_skills": [
      "string"
    ],
    "interests": [
      "string"
    ],
    "connections_count": 0,
    "followers_count": 0,
    "active_experience_title": "string",
    "active_experience_description": "string",
    "active_experience_department": "string",
    "active_experience_management_level": "string",
    "total_experience_duration_months": 0,
    "experience": [
      {
        "additionalProp1": {}
      }
    ],
    "education": [
      {
        "additionalProp1": {}
      }
    ],
    "certifications": [
      {
        "additionalProp1": {}
      }
    ],
    "is_working": true,
    "is_decision_maker": true,
    "imported_at": "2025-08-08T12:31:07.782Z"
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/core-signal/search-database/by-linkedin
Get Profile By Linkedin Url

Retrieve detailed profile information by LinkedIn URL. Searches the database for a profile matching the provided LinkedIn URL.

Parameters
Try it out
Name	Description
linkedin_url *
string
(query)
LinkedIn profile URL to search for

linkedin_url
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "parent_id": 0,
  "full_name": "string",
  "first_name": "string",
  "last_name": "string",
  "headline": "string",
  "summary": "string",
  "picture_url": "string",
  "linkedin_url": "string",
  "location_country": "string",
  "location_full": "string",
  "location_regions": [
    "string"
  ],
  "inferred_skills": [
    "string"
  ],
  "interests": [
    "string"
  ],
  "connections_count": 0,
  "followers_count": 0,
  "active_experience_title": "string",
  "active_experience_description": "string",
  "active_experience_department": "string",
  "active_experience_management_level": "string",
  "total_experience_duration_months": 0,
  "experience": [
    {
      "additionalProp1": {}
    }
  ],
  "education": [
    {
      "additionalProp1": {}
    }
  ],
  "certifications": [
    {
      "additionalProp1": {}
    }
  ],
  "is_working": true,
  "is_decision_maker": true,
  "imported_at": "2025-08-08T12:31:07.790Z"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links
Health


GET
/api/v1/core-signal/
Root

Health check endpoint

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
Talent Search


POST
/api/v1/core-signal/search-talents
Search Talents

Search for talents based on criteria and return their IDs. The actual talent details will be fetched and saved in the background.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "job_titles": [
    "AI ENGINEER",
    "MACHINE LEARNING",
    "AI RESEARCHER"
  ],
  "location_country": "Ghana",
  "location_full": "Accra",
  "skills_keywords": [
    "python",
    "tensorflow",
    "machine learning"
  ]
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "search_id": 0,
  "talent_ids": [
    0
  ],
  "total_count": 0,
  "status": "string",
  "message": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links
Talent Details


POST
/api/v1/core-signal/fetch-talent-details
Fetch Talent Details

Fetch detailed information for specific talent IDs and save to database. This endpoint processes the request in the background.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
[
  0
]
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "search_id": 0,
  "total_ids": 0,
  "processed_count": 0,
  "successful_count": 0,
  "failed_count": 0,
  "failed_ids": [
    0
  ],
  "status": "string",
  "message": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links
Status


GET
/api/v1/core-signal/search-status/{search_id}
Get Search Status

Get the status of a search/fetch operation

Parameters
Try it out
Name	Description
search_id *
integer
(path)
search_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "search_id": 0,
  "total_ids": 0,
  "processed_count": 0,
  "successful_count": 0,
  "failed_count": 0,
  "failed_ids": [
    0
  ],
  "status": "string",
  "message": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links
Talent Management


GET
/api/v1/core-signal/talents
Get Talents

Get all talent profiles with pagination

Parameters
Try it out
Name	Description
skip
integer
(query)
Number of records to skip

Default value : 0

0
minimum: 0
limit
integer
(query)
Number of records to return

Default value : 100

100
maximum: 1000
minimum: 1
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": 0,
    "full_name": "string",
    "headline": "string",
    "location_full": "string",
    "active_experience_title": "string",
    "active_experience_company_id": 0,
    "linkedin_url": "string",
    "summary": "string",
    "inferred_skills": [
      "string"
    ],
    "connections_count": 0,
    "followers_count": 0,
    "total_experience_duration_months": 0,
    "is_working": true
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/core-signal/talents/{talent_id}
Get Talent By Id

Get detailed information for a specific talent

Parameters
Try it out
Name	Description
talent_id *
integer
(path)
talent_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "parent_id": 0,
  "full_name": "string",
  "first_name": "string",
  "last_name": "string",
  "headline": "string",
  "summary": "string",
  "picture_url": "string",
  "linkedin_url": "string",
  "location_country": "string",
  "location_full": "string",
  "location_regions": [
    "string"
  ],
  "inferred_skills": [
    "string"
  ],
  "interests": [
    "string"
  ],
  "connections_count": 0,
  "followers_count": 0,
  "active_experience_title": "string",
  "active_experience_description": "string",
  "active_experience_department": "string",
  "active_experience_management_level": "string",
  "total_experience_duration_months": 0,
  "experience": [
    {
      "additionalProp1": {}
    }
  ],
  "education": [
    {
      "additionalProp1": {}
    }
  ],
  "certifications": [
    {
      "additionalProp1": {}
    }
  ],
  "is_working": true,
  "is_decision_maker": true,
  "imported_at": "2025-08-08T12:31:07.830Z"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

DELETE
/api/v1/core-signal/talents/{talent_id}
Delete Talent

Delete a talent profile

Parameters
Try it out
Name	Description
talent_id *
integer
(path)
talent_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links
Search Management


GET
/api/v1/core-signal/search-history
Get Search History

Get search history with pagination

Parameters
Try it out
Name	Description
skip
integer
(query)
Number of records to skip

Default value : 0

0
minimum: 0
limit
integer
(query)
Number of records to return

Default value : 100

100
maximum: 1000
minimum: 1
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "additionalProp1": {}
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links
Talent Collection


POST
/api/v1/core-signal/collect-by-id/{talent_id}
Collect By Id

Collect and save a talent profile by employee ID.

Parameters
Try it out
Name	Description
talent_id *
integer
(path)
talent_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "parent_id": 0,
  "full_name": "string",
  "first_name": "string",
  "last_name": "string",
  "headline": "string",
  "summary": "string",
  "picture_url": "string",
  "linkedin_url": "string",
  "location_country": "string",
  "location_full": "string",
  "location_regions": [
    "string"
  ],
  "inferred_skills": [
    "string"
  ],
  "interests": [
    "string"
  ],
  "connections_count": 0,
  "followers_count": 0,
  "active_experience_title": "string",
  "active_experience_description": "string",
  "active_experience_department": "string",
  "active_experience_management_level": "string",
  "total_experience_duration_months": 0,
  "experience": [
    {
      "additionalProp1": {}
    }
  ],
  "education": [
    {
      "additionalProp1": {}
    }
  ],
  "certifications": [
    {
      "additionalProp1": {}
    }
  ],
  "is_working": true,
  "is_decision_maker": true,
  "imported_at": "2025-08-08T12:31:07.849Z"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/core-signal/collect-by-shorthand-name
Collect By Shorthand Name

Collect and save a talent profile by LinkedIn shorthand name extracted from a URL.

Parameters
Try it out
Name	Description
linkedin_url *
string
(query)
linkedin_url
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "parent_id": 0,
  "full_name": "string",
  "first_name": "string",
  "last_name": "string",
  "headline": "string",
  "summary": "string",
  "picture_url": "string",
  "linkedin_url": "string",
  "location_country": "string",
  "location_full": "string",
  "location_regions": [
    "string"
  ],
  "inferred_skills": [
    "string"
  ],
  "interests": [
    "string"
  ],
  "connections_count": 0,
  "followers_count": 0,
  "active_experience_title": "string",
  "active_experience_description": "string",
  "active_experience_department": "string",
  "active_experience_management_level": "string",
  "total_experience_duration_months": 0,
  "experience": [
    {
      "additionalProp1": {}
    }
  ],
  "education": [
    {
      "additionalProp1": {}
    }
  ],
  "certifications": [
    {
      "additionalProp1": {}
    }
  ],
  "is_working": true,
  "is_decision_maker": true,
  "imported_at": "2025-08-08T12:31:07.857Z"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links
Database Search


POST
/api/v1/core-signal/search-database
Search Database

Search for talents in the database based on headline keywords, skills, and location filters. Returns detailed profile information for matching talents.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "headline_keywords": "AI Engineer, Machine Learning",
  "location_country": "Ghana",
  "location_country_iso2": "GH",
  "location_full": "Accra, Greater Accra Region, Ghana",
  "skills": [
    "python",
    "tensorflow",
    "machine learning"
  ]
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": 0,
    "parent_id": 0,
    "full_name": "string",
    "first_name": "string",
    "last_name": "string",
    "headline": "string",
    "summary": "string",
    "picture_url": "string",
    "linkedin_url": "string",
    "location_country": "string",
    "location_full": "string",
    "location_regions": [
      "string"
    ],
    "inferred_skills": [
      "string"
    ],
    "interests": [
      "string"
    ],
    "connections_count": 0,
    "followers_count": 0,
    "active_experience_title": "string",
    "active_experience_description": "string",
    "active_experience_department": "string",
    "active_experience_management_level": "string",
    "total_experience_duration_months": 0,
    "experience": [
      {
        "additionalProp1": {}
      }
    ],
    "education": [
      {
        "additionalProp1": {}
      }
    ],
    "certifications": [
      {
        "additionalProp1": {}
      }
    ],
    "is_working": true,
    "is_decision_maker": true,
    "imported_at": "2025-08-08T12:31:07.871Z"
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/core-signal/search-database/by-linkedin
Get Profile By Linkedin Url

Retrieve detailed profile information by LinkedIn URL. Searches the database for a profile matching the provided LinkedIn URL.

Parameters
Try it out
Name	Description
linkedin_url *
string
(query)
LinkedIn profile URL to search for

linkedin_url
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 0,
  "parent_id": 0,
  "full_name": "string",
  "first_name": "string",
  "last_name": "string",
  "headline": "string",
  "summary": "string",
  "picture_url": "string",
  "linkedin_url": "string",
  "location_country": "string",
  "location_full": "string",
  "location_regions": [
    "string"
  ],
  "inferred_skills": [
    "string"
  ],
  "interests": [
    "string"
  ],
  "connections_count": 0,
  "followers_count": 0,
  "active_experience_title": "string",
  "active_experience_description": "string",
  "active_experience_department": "string",
  "active_experience_management_level": "string",
  "total_experience_duration_months": 0,
  "experience": [
    {
      "additionalProp1": {}
    }
  ],
  "education": [
    {
      "additionalProp1": {}
    }
  ],
  "certifications": [
    {
      "additionalProp1": {}
    }
  ],
  "is_working": true,
  "is_decision_maker": true,
  "imported_at": "2025-08-08T12:31:07.882Z"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links
chat


POST
/api/v1/chat/chat
Chat With Agent


Send a message to the chat agent and get a response.

Args: message: User's message session_id: Optional session ID for conversation continuity temperature: Model temperature for response generation current_user: Current authenticated user

Returns: Chat response with conversation state

Parameters
Try it out
Name	Description
message *
string
(query)
message
session_id
string | (string | null)
(query)
session_id
temperature
number
(query)
Default value : 0.7

0.7
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "additionalProp1": {}
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/chat/chat/history
Get Chat History


Get chat history for the current user.

Args: session_id: Optional specific session ID limit: Number of messages to retrieve offset: Offset for pagination current_user: Current authenticated user

Returns: List of chat messages

Parameters
Try it out
Name	Description
session_id
string | (string | null)
(query)
Specific session ID

session_id
limit
integer
(query)
Number of messages to retrieve

Default value : 50

50
maximum: 100
minimum: 1
offset
integer
(query)
Offset for pagination

Default value : 0

0
minimum: 0
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "additionalProp1": {}
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/chat/chat/sessions
Get Chat Sessions


Get chat sessions for the current user.

Args: limit: Number of sessions to retrieve offset: Offset for pagination current_user: Current authenticated user

Returns: List of chat sessions

Parameters
Try it out
Name	Description
limit
integer
(query)
Number of sessions to retrieve

Default value : 20

20
maximum: 50
minimum: 1
offset
integer
(query)
Offset for pagination

Default value : 0

0
minimum: 0
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "additionalProp1": {}
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/chat/chat/analyze-search
Analyze Search History


Analyze user's search history and provide insights.

Args: analysis_type: Type of analysis to perform time_range: Time range for analysis current_user: Current authenticated user

Returns: Analysis results

Parameters
Try it out
Name	Description
analysis_type *
string
(query)
Type of analysis (patterns, insights, recommendations)

analysis_type
time_range
string
(query)
Time range for analysis

Default value : 30d

30d
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "additionalProp1": {}
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/chat/chat/status
Get Chat Agent Status

Get status of the chat agent.

Returns: AgentStatus for the chat agent

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "name": "string",
  "status": "healthy",
  "last_activity": "2025-08-08T12:31:07.919Z",
  "total_requests": 0,
  "successful_requests": 0,
  "failed_requests": 0,
  "average_response_time": 0,
  "current_load": 0,
  "max_concurrent_requests": 0,
  "version": "string"
}
No links

POST
/api/v1/chat/chat/clear-session
Clear Chat Session


Clear a specific chat session.

Args: session_id: Session ID to clear current_user: Current authenticated user

Returns: Success message

Parameters
Try it out
Name	Description
session_id *
string
(query)
session_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/chat/chat/tools
Get Available Tools

Get available MCP tools for the chat agent.

Returns: List of available tools

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "additionalProp1": {}
  }
]
No links
legacy-auth


POST
/v1/auth/login
Login

Parameters
Try it out
No parameters

Request body

application/x-www-form-urlencoded
grant_type
string | (string | null)
pattern: ^password$
username *
string
password *
string($password)
scope
string
client_id
string | (string | null)
client_secret
string | (string | null)($password)
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2025-08-08T12:31:07.933Z",
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "bearer",
  "session_id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/v1/auth/logout
Logout


Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links

POST
/v1/auth/refresh
Refresh Token

Parameters
Try it out
Name	Description
refresh_token *
string
(query)
refresh_token
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2025-08-08T12:31:07.942Z",
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "bearer",
  "session_id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/v1/auth/me
Read Users Me


Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2025-08-08T12:31:07.947Z"
}
No links

DELETE
/v1/auth/me
Delete Account


Delete the current user's account and all associated data.

Parameters
Try it out
No parameters

Responses
Code	Description	Links
204	
Successful Response

No links
default


GET
/health
Health Check

Health check endpoint for monitoring.

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links

GET
/
Root

Root endpoint with basic information.

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links

Schemas
AgentHealthCheckCollapse allobject
Model for comprehensive agent health check.

overall_statusCollapse allstring
Overall system status

EnumCollapse allarray
#0"healthy"
#1"degraded"
#2"unhealthy"
timestampCollapse allstringdate-time
Health check timestamp

total_agentsCollapse allinteger
Total number of agents

healthy_agentsCollapse allinteger
Number of healthy agents

unhealthy_agentsCollapse allinteger
Number of unhealthy agents

check_durationCollapse allnumber
Health check duration in seconds

agent_detailsCollapse allobject
Detailed agent health information

Additional propertiesCollapse allobject
Additional propertiesallowed
system_infoCollapse allobject
System information

Additional propertiesallowed
AgentStatusCollapse allobject
Model for agent status information.

nameCollapse allstring
Agent name

statusCollapse allstring
Agent status

EnumCollapse allarray
#0"healthy"
#1"degraded"
#2"unhealthy"
#3"offline"
last_activityCollapse allstringdate-time
Last activity timestamp

total_requestsCollapse allinteger
Total requests processed

successful_requestsCollapse allinteger
Successful requests

failed_requestsCollapse allinteger
Failed requests

average_response_timeCollapse allnumber
Average response time in seconds

current_loadCollapse allinteger
Current concurrent requests

max_concurrent_requestsCollapse allinteger
Maximum concurrent requests

versionCollapse allstring
Agent version

AggregationResultCollapse allobject
Model for aggregated search results from multiple sources.

search_idCollapse allstring
Unique search identifier

user_idCollapse allstring
User who performed the search

session_idCollapse allstring
Session identifier

search_criteria_summaryCollapse allstring
Summary of search criteria

total_resultsCollapse allinteger≥ 0
Total number of results

database_results_countCollapse allinteger≥ 0
Results from database search

live_search_results_countCollapse allinteger≥ 0
Results from live search

ranked_profilesCollapse allarray<object>
Ranked talent profiles

ItemsCollapse allobject
Model for a ranked talent profile with scoring details.

profileCollapse allobject
The talent profile

idCollapse allinteger
Unique talent ID

parent_idCollapse all(integer | null)
Parent profile ID if applicable

Any ofCollapse all(integer | null)
#0integer
#1null
full_nameCollapse allstring
Full name

first_nameCollapse all(string | null)
First name

Any ofCollapse all(string | null)
#0string
#1null
last_nameCollapse all(string | null)
Last name

Any ofCollapse all(string | null)
#0string
#1null
headlineCollapse allstring
Professional headline

summaryCollapse all(string | null)
Professional summary

Any ofCollapse all(string | null)
#0string
#1null
picture_urlCollapse all(string | null)
Profile picture URL

Any ofCollapse all(string | null)
#0string
#1null
linkedin_urlCollapse allstring
LinkedIn profile URL

location_countryCollapse all(string | null)
Country

Any ofCollapse all(string | null)
#0string
#1null
location_fullCollapse all(string | null)
Full location string

Any ofCollapse all(string | null)
#0string
#1null
location_regionsCollapse allarray<string>
Geographic regions

Itemsstring
inferred_skillsCollapse allarray<string>
Inferred skills

Itemsstring
interestsCollapse allarray<string>
Professional interests

Itemsstring
connections_countCollapse all(integer | null)
Number of LinkedIn connections

Any ofCollapse all(integer | null)
#0integer
#1null
followers_countCollapse all(integer | null)
Number of LinkedIn followers

Any ofCollapse all(integer | null)
#0integer
#1null
active_experience_titleCollapse all(string | null)
Current job title

Any ofCollapse all(string | null)
#0string
#1null
active_experience_company_idCollapse all(integer | null)
Current company ID

Any ofCollapse all(integer | null)
#0integer
#1null
active_experience_descriptionCollapse all(string | null)
Current job description

Any ofCollapse all(string | null)
#0string
#1null
active_experience_departmentCollapse all(string | null)
Current department

Any ofCollapse all(string | null)
#0string
#1null
active_experience_management_levelCollapse all(string | null)
Current management level

Any ofCollapse all(string | null)
#0string
#1null
total_experience_duration_monthsCollapse all(integer | null)
Total experience in months

Any ofCollapse all(integer | null)
#0integer
#1null
experienceCollapse allarray<object>
Work experience entries

ItemsCollapse allobject
Individual work experience entry.

active_experienceCollapse allboolean
Whether this is the current active position

position_titleCollapse allstring
Job title/position

departmentCollapse all(string | null)
Department or functional area

Any ofCollapse all(string | null)
#0string
#1null
management_levelCollapse all(string | null)
Management level

Any ofCollapse all(string | null)
#0string
#1null
locationCollapse all(string | null)
Work location

Any ofCollapse all(string | null)
#0string
#1null
descriptionCollapse all(string | null)
Job description and responsibilities

Any ofCollapse all(string | null)
#0string
#1null
date_fromCollapse all(string | null)
Start date (formatted string)

Any ofCollapse all(string | null)
#0string
#1null
date_from_yearCollapse all(integer | null)
Start year

Any ofCollapse all(integer | null)
#0integer
#1null
date_from_monthCollapse all(integer | null)
Start month

Any ofCollapse all(integer | null)
#0integer
#1null
date_toCollapse all(string | null)
End date (formatted string)

Any ofCollapse all(string | null)
#0string
#1null
date_to_yearCollapse all(integer | null)
End year

Any ofCollapse all(integer | null)
#0integer
#1null
date_to_monthCollapse all(integer | null)
End month

Any ofCollapse all(integer | null)
#0integer
#1null
duration_monthsCollapse all(integer | null)
Duration in months

Any ofCollapse all(integer | null)
#0integer
#1null
company_nameCollapse allstring
Company name

company_idCollapse all(integer | null)
Company ID in database

Any ofCollapse all(integer | null)
#0integer
#1null
company_typeCollapse all(string | null)
Type of company

Any ofCollapse all(string | null)
#0string
#1null
company_size_rangeCollapse all(string | null)
Company size range

Any ofCollapse all(string | null)
#0string
#1null
company_employees_countCollapse all(integer | null)
Number of employees

Any ofCollapse all(integer | null)
#0integer
#1null
company_industryCollapse all(string | null)
Company industry

Any ofCollapse all(string | null)
#0string
#1null
company_websiteCollapse all(string | null)
Company website

Any ofCollapse all(string | null)
#0string
#1null
company_linkedin_urlCollapse all(string | null)
Company LinkedIn URL

Any ofCollapse all(string | null)
#0string
#1null
company_hq_countryCollapse all(string | null)
Company headquarters country

Any ofCollapse all(string | null)
#0string
#1null
company_hq_cityCollapse all(string | null)
Company headquarters city

Any ofCollapse all(string | null)
#0string
#1null
order_in_profileCollapse allinteger
Order of this experience in the profile

educationCollapse allarray<object>
Education entries

ItemsCollapse allobject
Individual education entry.

degreeCollapse allstring
Degree and field of study

descriptionCollapse all(string | null)
Additional description

Any ofCollapse all(string | null)
#0string
#1null
institution_nameCollapse allstring
Educational institution name

institution_urlCollapse all(string | null)
Institution LinkedIn URL

Any ofCollapse all(string | null)
#0string
#1null
institution_country_iso2Collapse all(string | null)
Institution country ISO2 code

Any ofCollapse all(string | null)
#0string
#1null
institution_cityCollapse all(string | null)
Institution city

Any ofCollapse all(string | null)
#0string
#1null
date_from_yearCollapse all(integer | null)
Start year

Any ofCollapse all(integer | null)
#0integer
#1null
date_to_yearCollapse all(integer | null)
End year

Any ofCollapse all(integer | null)
#0integer
#1null
activities_and_societiesCollapse all(string | null)
Activities and societies

Any ofCollapse all(string | null)
#0string
#1null
order_in_profileCollapse allinteger
Order of this education in the profile

certificationsCollapse allarray<object>
Certification entries

ItemsCollapse allobject
Individual certification entry.

titleCollapse allstring
Certification title

issuerCollapse allstring
Issuing organization

issuer_urlCollapse all(string | null)
Issuer LinkedIn URL

Any ofCollapse all(string | null)
#0string
#1null
credential_idCollapse all(string | null)
Credential ID

Any ofCollapse all(string | null)
#0string
#1null
certificate_urlCollapse all(string | null)
Certificate URL

Any ofCollapse all(string | null)
#0string
#1null
date_fromCollapse all(string | null)
Issue date

Any ofCollapse all(string | null)
#0string
#1null
date_from_yearCollapse all(integer | null)
Issue year

Any ofCollapse all(integer | null)
#0integer
#1null
date_from_monthCollapse all(integer | null)
Issue month

Any ofCollapse all(integer | null)
#0integer
#1null
date_toCollapse all(string | null)
Expiration date

Any ofCollapse all(string | null)
#0string
#1null
date_to_yearCollapse all(integer | null)
Expiration year

Any ofCollapse all(integer | null)
#0integer
#1null
date_to_monthCollapse all(integer | null)
Expiration month

Any ofCollapse all(integer | null)
#0integer
#1null
order_in_profileCollapse allinteger
Order of this certification in the profile

is_workingCollapse all(boolean | null)
Currently employed

Any ofCollapse all(boolean | null)
#0boolean
#1null
is_decision_makerCollapse all(boolean | null)
Is a decision maker

Any ofCollapse all(boolean | null)
#0boolean
#1null
imported_atCollapse all(string | null)
When the profile was imported

Any ofCollapse all(string | null)
#0stringdate-time
#1null
updated_atCollapse all(string | null)
Last update timestamp

Any ofCollapse all(string | null)
#0stringdate-time
#1null
rank_positionCollapse allinteger≥ 1
Rank position in results

relevance_scoreCollapse allnumber[0, 100]
Overall relevance score

skill_match_scoreCollapse allnumber[0, 100]
Skills matching score

experience_scoreCollapse allnumber[0, 100]
Experience level score

location_scoreCollapse allnumber[0, 100]
Location matching score

job_title_scoreCollapse allnumber[0, 100]
Job title matching score

matched_skillsCollapse allarray<object>
List of matched skills

ItemsCollapse allobject
Model for skill matching information.

searched_skillCollapse allstring
The skill that was searched for

matched_skillCollapse all(string | null)
The matching skill found in profile

Any ofCollapse all(string | null)
#0string
#1null
match_scoreCollapse allnumber[0, 100]
Match score percentage

match_typeCollapse allstring
Type of match

EnumCollapse allarray
#0"exact"
#1"partial"
#2"similar"
missing_skillsCollapse allarray<string>
Skills from criteria not found

Itemsstring
ranking_explanationCollapse allstring
Human-readable ranking explanation

key_achievementsCollapse allarray<string>
Key achievements from experience

Itemsstring
relevant_experienceCollapse allarray<string>
Most relevant experience entries

Itemsstring
certificationsCollapse allarray<string>
Relevant certifications

Itemsstring
education_summaryCollapse allstring
Education summary

Default""
career_progressionCollapse allstring
Career progression analysis

Default""
source_typeCollapse allstring
Source of the profile

EnumCollapse allarray
#0"database"
#1"live"
#2"hybrid"
source_detailsCollapse all(object | null)
Additional source information

Any ofCollapse all(object | null)
#0Collapse allobject
Additional propertiesallowed
#1null
total_execution_timeCollapse allnumber≥ 0
Total execution time in seconds

database_search_timeCollapse all(number | null)
Database search time

Any ofCollapse all(number | null)
#0number
#1null
live_search_timeCollapse all(number | null)
Live search time

Any ofCollapse all(number | null)
#0number
#1null
ranking_timeCollapse allnumber≥ 0
Ranking processing time

average_relevance_scoreCollapse allnumber[0, 100]
Average relevance score

top_scoreCollapse allnumber[0, 100]
Highest relevance score

score_distributionCollapse allobject
Distribution of scores by range

Additional propertiesinteger
skill_coverage_analysisCollapse allobject
Analysis of skill coverage

Additional propertiesallowed
location_distributionCollapse allobject
Distribution by location

Additional propertiesinteger
recommendationsCollapse allarray<string>
Recommendations for improving search

Itemsstring
created_atCollapse allstringdate-time
Creation timestamp

Body_login_api_v1_auths_login_postExpand allobject
Body_login_v1_auth_login_postCollapse allobject
grant_typeCollapse all(string | null)
Any ofCollapse all(string | null)
#0stringmatches ^password$
#1null
usernamestring
passwordstringpassword
scopeCollapse allstring
Default""
client_idCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
client_secretCollapse allstring | (string | null)password
Any ofCollapse all(string | null)
#0string
#1null
BulkProcessResponseCollapse allobject
Response model for bulk processing

search_idinteger
total_idsinteger
processed_countinteger
successful_countinteger
failed_countinteger
failed_idsCollapse allarray<integer>
Itemsinteger
statusstring
messagestring
CertificationEntryCollapse allobject
Individual certification entry.

titleCollapse allstring
Certification title

issuerCollapse allstring
Issuing organization

issuer_urlCollapse all(string | null)
Issuer LinkedIn URL

Any ofCollapse all(string | null)
#0string
#1null
credential_idCollapse all(string | null)
Credential ID

Any ofCollapse all(string | null)
#0string
#1null
certificate_urlCollapse all(string | null)
Certificate URL

Any ofCollapse all(string | null)
#0string
#1null
date_fromCollapse all(string | null)
Issue date

Any ofCollapse all(string | null)
#0string
#1null
date_from_yearCollapse all(integer | null)
Issue year

Any ofCollapse all(integer | null)
#0integer
#1null
date_from_monthCollapse all(integer | null)
Issue month

Any ofCollapse all(integer | null)
#0integer
#1null
date_toCollapse all(string | null)
Expiration date

Any ofCollapse all(string | null)
#0string
#1null
date_to_yearCollapse all(integer | null)
Expiration year

Any ofCollapse all(integer | null)
#0integer
#1null
date_to_monthCollapse all(integer | null)
Expiration month

Any ofCollapse all(integer | null)
#0integer
#1null
order_in_profileCollapse allinteger
Order of this certification in the profile

CompanyTypeCollapse allstring
Company type enumeration.

EnumCollapse allarray
#0"Startup"
#1"Privately Held"
#2"Public Company"
#3"Nonprofit"
#4"Government Agency"
#5"Educational Institution"
DatabaseSearchRequestCollapse allobject
headline_keywordsCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
skillsCollapse all(array<string> | null)
Any ofCollapse all(array<string> | null)
#0Collapse allarray<string>
Itemsstring
#1null
location_fullCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
location_countryCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
location_country_iso2Collapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
ExampleCollapse allobject
headline_keywords"AI Engineer, Machine Learning"
location_country"Ghana"
location_country_iso2"GH"
location_full"Accra, Greater Accra Region, Ghana"
skillsCollapse allarray
#0"python"
#1"tensorflow"
#2"machine learning"
DepartmentCollapse allstring
Department enumeration.

EnumCollapse allarray
#0"Engineering and Technical"
#1"Sales"
#2"Marketing"
#3"Human Resources"
#4"Finance"
#5"Operations"
#6"Product"
#7"Design"
#8"Legal"
#9"Other"
EducationEntryCollapse allobject
Individual education entry.

degreeCollapse allstring
Degree and field of study

descriptionCollapse all(string | null)
Additional description

Any ofCollapse all(string | null)
#0string
#1null
institution_nameCollapse allstring
Educational institution name

institution_urlCollapse all(string | null)
Institution LinkedIn URL

Any ofCollapse all(string | null)
#0string
#1null
institution_country_iso2Collapse all(string | null)
Institution country ISO2 code

Any ofCollapse all(string | null)
#0string
#1null
institution_cityCollapse all(string | null)
Institution city

Any ofCollapse all(string | null)
#0string
#1null
date_from_yearCollapse all(integer | null)
Start year

Any ofCollapse all(integer | null)
#0integer
#1null
date_to_yearCollapse all(integer | null)
End year

Any ofCollapse all(integer | null)
#0integer
#1null
activities_and_societiesCollapse all(string | null)
Activities and societies

Any ofCollapse all(string | null)
#0string
#1null
order_in_profileCollapse allinteger
Order of this education in the profile

EmailVerificationRequestCollapse allobject
emailstringemail
ExperienceEntryCollapse allobject
Individual work experience entry.

active_experienceCollapse allboolean
Whether this is the current active position

position_titleCollapse allstring
Job title/position

departmentCollapse all(string | null)
Department or functional area

Any ofCollapse all(string | null)
#0string
#1null
management_levelCollapse all(string | null)
Management level

Any ofCollapse all(string | null)
#0string
#1null
locationCollapse all(string | null)
Work location

Any ofCollapse all(string | null)
#0string
#1null
descriptionCollapse all(string | null)
Job description and responsibilities

Any ofCollapse all(string | null)
#0string
#1null
date_fromCollapse all(string | null)
Start date (formatted string)

Any ofCollapse all(string | null)
#0string
#1null
date_from_yearCollapse all(integer | null)
Start year

Any ofCollapse all(integer | null)
#0integer
#1null
date_from_monthCollapse all(integer | null)
Start month

Any ofCollapse all(integer | null)
#0integer
#1null
date_toCollapse all(string | null)
End date (formatted string)

Any ofCollapse all(string | null)
#0string
#1null
date_to_yearCollapse all(integer | null)
End year

Any ofCollapse all(integer | null)
#0integer
#1null
date_to_monthCollapse all(integer | null)
End month

Any ofCollapse all(integer | null)
#0integer
#1null
duration_monthsCollapse all(integer | null)
Duration in months

Any ofCollapse all(integer | null)
#0integer
#1null
company_nameCollapse allstring
Company name

company_idCollapse all(integer | null)
Company ID in database

Any ofCollapse all(integer | null)
#0integer
#1null
company_typeCollapse all(string | null)
Type of company

Any ofCollapse all(string | null)
#0string
#1null
company_size_rangeCollapse all(string | null)
Company size range

Any ofCollapse all(string | null)
#0string
#1null
company_employees_countCollapse all(integer | null)
Number of employees

Any ofCollapse all(integer | null)
#0integer
#1null
company_industryCollapse all(string | null)
Company industry

Any ofCollapse all(string | null)
#0string
#1null
company_websiteCollapse all(string | null)
Company website

Any ofCollapse all(string | null)
#0string
#1null
company_linkedin_urlCollapse all(string | null)
Company LinkedIn URL

Any ofCollapse all(string | null)
#0string
#1null
company_hq_countryCollapse all(string | null)
Company headquarters country

Any ofCollapse all(string | null)
#0string
#1null
company_hq_cityCollapse all(string | null)
Company headquarters city

Any ofCollapse all(string | null)
#0string
#1null
order_in_profileCollapse allinteger
Order of this experience in the profile

HTTPValidationErrorExpand allobject
ManagementLevelCollapse allstring
Management level enumeration.

EnumCollapse allarray
#0"Intern"
#1"Specialist"
#2"Senior Specialist"
#3"Team Lead"
#4"Manager"
#5"Senior Manager"
#6"Director"
#7"VP"
#8"C-Level"
OTPVerificationRequestExpand allobject
PasswordResetRequestExpand allobject
PasswordResetVerifyCollapse allobject
emailstringemail
otpstring
current_passwordstring
new_passwordstring≥ 8 characters
confirm_passwordstring
SearchModeCollapse allstring
Search mode enumeration.

EnumCollapse allarray
#0"database"
#1"live"
#2"hybrid"
SearchQueryRequestCollapse allobject
Request model for talent search

location_fullCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
location_countryCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
job_titlesCollapse allarray<string>
List of job titles to search for

Itemsstring
skills_keywordsCollapse all(array<string> | null)
Any ofCollapse all(array<string> | null)
#0Collapse allarray<string>
Itemsstring
#1null
ExampleCollapse allobject
job_titlesCollapse allarray
#0"AI ENGINEER"
#1"MACHINE LEARNING"
#2"AI RESEARCHER"
location_country"Ghana"
location_full"Accra"
skills_keywordsCollapse allarray
#0"python"
#1"tensorflow"
#2"machine learning"
SearchReportCollapse allobject
Model for comprehensive search report.

report_idCollapse allstring
Unique report identifier

search_idCollapse allstring
Associated search identifier

user_idCollapse allstring
User who requested the report

executive_summaryCollapse allstring
Executive summary of search results

key_findingsCollapse allarray<string>
Key findings from the search

Itemsstring
aggregation_resultCollapse allobject
Aggregated search results

search_idCollapse allstring
Unique search identifier

user_idCollapse allstring
User who performed the search

session_idCollapse allstring
Session identifier

search_criteria_summaryCollapse allstring
Summary of search criteria

total_resultsCollapse allinteger≥ 0
Total number of results

database_results_countCollapse allinteger≥ 0
Results from database search

live_search_results_countCollapse allinteger≥ 0
Results from live search

ranked_profilesCollapse allarray<object>
Ranked talent profiles

ItemsCollapse allobject
Model for a ranked talent profile with scoring details.

profileCollapse allobject
The talent profile

idCollapse allinteger
Unique talent ID

parent_idCollapse all(integer | null)
Parent profile ID if applicable

Any ofCollapse all(integer | null)
#0integer
#1null
full_nameCollapse allstring
Full name

first_nameCollapse all(string | null)
First name

Any ofCollapse all(string | null)
#0string
#1null
last_nameCollapse all(string | null)
Last name

Any ofCollapse all(string | null)
#0string
#1null
headlineCollapse allstring
Professional headline

summaryCollapse all(string | null)
Professional summary

Any ofCollapse all(string | null)
#0string
#1null
picture_urlCollapse all(string | null)
Profile picture URL

Any ofCollapse all(string | null)
#0string
#1null
linkedin_urlCollapse allstring
LinkedIn profile URL

location_countryCollapse all(string | null)
Country

Any ofCollapse all(string | null)
#0string
#1null
location_fullCollapse all(string | null)
Full location string

Any ofCollapse all(string | null)
#0string
#1null
location_regionsCollapse allarray<string>
Geographic regions

Itemsstring
inferred_skillsCollapse allarray<string>
Inferred skills

Itemsstring
interestsCollapse allarray<string>
Professional interests

Itemsstring
connections_countCollapse all(integer | null)
Number of LinkedIn connections

Any ofCollapse all(integer | null)
#0integer
#1null
followers_countCollapse all(integer | null)
Number of LinkedIn followers

Any ofCollapse all(integer | null)
#0integer
#1null
active_experience_titleCollapse all(string | null)
Current job title

Any ofCollapse all(string | null)
#0string
#1null
active_experience_company_idCollapse all(integer | null)
Current company ID

Any ofCollapse all(integer | null)
#0integer
#1null
active_experience_descriptionCollapse all(string | null)
Current job description

Any ofCollapse all(string | null)
#0string
#1null
active_experience_departmentCollapse all(string | null)
Current department

Any ofCollapse all(string | null)
#0string
#1null
active_experience_management_levelCollapse all(string | null)
Current management level

Any ofCollapse all(string | null)
#0string
#1null
total_experience_duration_monthsCollapse all(integer | null)
Total experience in months

Any ofCollapse all(integer | null)
#0integer
#1null
experienceCollapse allarray<object>
Work experience entries

ItemsCollapse allobject
Individual work experience entry.

active_experienceCollapse allboolean
Whether this is the current active position

position_titleCollapse allstring
Job title/position

departmentCollapse all(string | null)
Department or functional area

Any ofCollapse all(string | null)
#0string
#1null
management_levelCollapse all(string | null)
Management level

Any ofCollapse all(string | null)
#0string
#1null
locationCollapse all(string | null)
Work location

Any ofCollapse all(string | null)
#0string
#1null
descriptionCollapse all(string | null)
Job description and responsibilities

Any ofCollapse all(string | null)
#0string
#1null
date_fromCollapse all(string | null)
Start date (formatted string)

Any ofCollapse all(string | null)
#0string
#1null
date_from_yearCollapse all(integer | null)
Start year

Any ofCollapse all(integer | null)
#0integer
#1null
date_from_monthCollapse all(integer | null)
Start month

Any ofCollapse all(integer | null)
#0integer
#1null
date_toCollapse all(string | null)
End date (formatted string)

Any ofCollapse all(string | null)
#0string
#1null
date_to_yearCollapse all(integer | null)
End year

Any ofCollapse all(integer | null)
#0integer
#1null
date_to_monthCollapse all(integer | null)
End month

Any ofCollapse all(integer | null)
#0integer
#1null
duration_monthsCollapse all(integer | null)
Duration in months

Any ofCollapse all(integer | null)
#0integer
#1null
company_nameCollapse allstring
Company name

company_idCollapse all(integer | null)
Company ID in database

Any ofCollapse all(integer | null)
#0integer
#1null
company_typeCollapse all(string | null)
Type of company

Any ofCollapse all(string | null)
#0string
#1null
company_size_rangeCollapse all(string | null)
Company size range

Any ofCollapse all(string | null)
#0string
#1null
company_employees_countCollapse all(integer | null)
Number of employees

Any ofCollapse all(integer | null)
#0integer
#1null
company_industryCollapse all(string | null)
Company industry

Any ofCollapse all(string | null)
#0string
#1null
company_websiteCollapse all(string | null)
Company website

Any ofCollapse all(string | null)
#0string
#1null
company_linkedin_urlCollapse all(string | null)
Company LinkedIn URL

Any ofCollapse all(string | null)
#0string
#1null
company_hq_countryCollapse all(string | null)
Company headquarters country

Any ofCollapse all(string | null)
#0string
#1null
company_hq_cityCollapse all(string | null)
Company headquarters city

Any ofCollapse all(string | null)
#0string
#1null
order_in_profileCollapse allinteger
Order of this experience in the profile

educationCollapse allarray<object>
Education entries

ItemsCollapse allobject
Individual education entry.

degreeCollapse allstring
Degree and field of study

descriptionCollapse all(string | null)
Additional description

Any ofCollapse all(string | null)
#0string
#1null
institution_nameCollapse allstring
Educational institution name

institution_urlCollapse all(string | null)
Institution LinkedIn URL

Any ofCollapse all(string | null)
#0string
#1null
institution_country_iso2Collapse all(string | null)
Institution country ISO2 code

Any ofCollapse all(string | null)
#0string
#1null
institution_cityCollapse all(string | null)
Institution city

Any ofCollapse all(string | null)
#0string
#1null
date_from_yearCollapse all(integer | null)
Start year

Any ofCollapse all(integer | null)
#0integer
#1null
date_to_yearCollapse all(integer | null)
End year

Any ofCollapse all(integer | null)
#0integer
#1null
activities_and_societiesCollapse all(string | null)
Activities and societies

Any ofCollapse all(string | null)
#0string
#1null
order_in_profileCollapse allinteger
Order of this education in the profile

certificationsCollapse allarray<object>
Certification entries

ItemsCollapse allobject
Individual certification entry.

titleCollapse allstring
Certification title

issuerCollapse allstring
Issuing organization

issuer_urlCollapse all(string | null)
Issuer LinkedIn URL

Any ofCollapse all(string | null)
#0string
#1null
credential_idCollapse all(string | null)
Credential ID

Any ofCollapse all(string | null)
#0string
#1null
certificate_urlCollapse all(string | null)
Certificate URL

Any ofCollapse all(string | null)
#0string
#1null
date_fromCollapse all(string | null)
Issue date

Any ofCollapse all(string | null)
#0string
#1null
date_from_yearCollapse all(integer | null)
Issue year

Any ofCollapse all(integer | null)
#0integer
#1null
date_from_monthCollapse all(integer | null)
Issue month

Any ofCollapse all(integer | null)
#0integer
#1null
date_toCollapse all(string | null)
Expiration date

Any ofCollapse all(string | null)
#0string
#1null
date_to_yearCollapse all(integer | null)
Expiration year

Any ofCollapse all(integer | null)
#0integer
#1null
date_to_monthCollapse all(integer | null)
Expiration month

Any ofCollapse all(integer | null)
#0integer
#1null
order_in_profileCollapse allinteger
Order of this certification in the profile

is_workingCollapse all(boolean | null)
Currently employed

Any ofCollapse all(boolean | null)
#0boolean
#1null
is_decision_makerCollapse all(boolean | null)
Is a decision maker

Any ofCollapse all(boolean | null)
#0boolean
#1null
imported_atCollapse all(string | null)
When the profile was imported

Any ofCollapse all(string | null)
#0stringdate-time
#1null
updated_atCollapse all(string | null)
Last update timestamp

Any ofCollapse all(string | null)
#0stringdate-time
#1null
rank_positionCollapse allinteger≥ 1
Rank position in results

relevance_scoreCollapse allnumber[0, 100]
Overall relevance score

skill_match_scoreCollapse allnumber[0, 100]
Skills matching score

experience_scoreCollapse allnumber[0, 100]
Experience level score

location_scoreCollapse allnumber[0, 100]
Location matching score

job_title_scoreCollapse allnumber[0, 100]
Job title matching score

matched_skillsCollapse allarray<object>
List of matched skills

ItemsCollapse allobject
Model for skill matching information.

searched_skillCollapse allstring
The skill that was searched for

matched_skillCollapse all(string | null)
The matching skill found in profile

Any ofCollapse all(string | null)
#0string
#1null
match_scoreCollapse allnumber[0, 100]
Match score percentage

match_typeCollapse allstring
Type of match

EnumCollapse allarray
#0"exact"
#1"partial"
#2"similar"
missing_skillsCollapse allarray<string>
Skills from criteria not found

Itemsstring
ranking_explanationCollapse allstring
Human-readable ranking explanation

key_achievementsCollapse allarray<string>
Key achievements from experience

Itemsstring
relevant_experienceCollapse allarray<string>
Most relevant experience entries

Itemsstring
certificationsCollapse allarray<string>
Relevant certifications

Itemsstring
education_summaryCollapse allstring
Education summary

Default""
career_progressionCollapse allstring
Career progression analysis

Default""
source_typeCollapse allstring
Source of the profile

EnumCollapse allarray
#0"database"
#1"live"
#2"hybrid"
source_detailsCollapse all(object | null)
Additional source information

Any ofCollapse all(object | null)
#0Collapse allobject
Additional propertiesallowed
#1null
total_execution_timeCollapse allnumber≥ 0
Total execution time in seconds

database_search_timeCollapse all(number | null)
Database search time

Any ofCollapse all(number | null)
#0number
#1null
live_search_timeCollapse all(number | null)
Live search time

Any ofCollapse all(number | null)
#0number
#1null
ranking_timeCollapse allnumber≥ 0
Ranking processing time

average_relevance_scoreCollapse allnumber[0, 100]
Average relevance score

top_scoreCollapse allnumber[0, 100]
Highest relevance score

score_distributionCollapse allobject
Distribution of scores by range

Additional propertiesinteger
skill_coverage_analysisCollapse allobject
Analysis of skill coverage

Additional propertiesallowed
location_distributionCollapse allobject
Distribution by location

Additional propertiesinteger
recommendationsCollapse allarray<string>
Recommendations for improving search

Itemsstring
created_atCollapse allstringdate-time
Creation timestamp

top_candidates_analysisCollapse allstring
Analysis of top candidates

candidate_diversity_scoreCollapse allnumber[0, 100]
Diversity score of candidates

market_insightsCollapse allobject
Market insights from search

Additional propertiesallowed
talent_availabilityCollapse allstring
Assessment of talent availability

hiring_recommendationsCollapse allarray<string>
Hiring recommendations

Itemsstring
search_optimization_tipsCollapse allarray<string>
Tips for optimizing future searches

Itemsstring
generated_atCollapse allstringdate-time
Report generation time

report_versionCollapse allstring
Report format version

Default"1.0"
SearchRequestExpand allobject
SearchRequestExpand allobject
SearchResultsCollapse allobject
Search results model.

search_idCollapse allstring
Unique search ID

user_idCollapse allstring
User ID who performed the search

search_requestCollapse allobject
Original search request

user_idCollapse allstring
User ID making the request

session_idCollapse all(string | null)
Session ID for the request (auto-extracted from cookies if not provided)

Any ofCollapse all(string | null)
#0string
#1null
search_modeCollapse allstring
Search mode to use

EnumCollapse allarray
#0"database"
#1"live"
#2"hybrid"
criteriaCollapse allobject
Search criteria

job_titlesCollapse allarray<string>
Target job titles

Itemsstring
skills_keywordsCollapse allarray<string>
Required or preferred skills

Itemsstring
location_fullCollapse all(string | null)
Full location string

Any ofCollapse all(string | null)
#0string
#1null
location_countryCollapse all(string | null)
Country filter

Any ofCollapse all(string | null)
#0string
#1null
location_country_iso2Collapse all(string | null)
Country ISO2 code

Any ofCollapse all(string | null)
#0string
#1null
experience_years_minCollapse all(integer | null)
Minimum years of experience

Any ofCollapse all(integer | null)
#0integer
#1null
experience_years_maxCollapse all(integer | null)
Maximum years of experience

Any ofCollapse all(integer | null)
#0integer
#1null
management_levelCollapse all(string | null)
Target management level

Any ofCollapse all(string | null)
#0 ManagementLevelCollapse allstring
Management level enumeration.

EnumCollapse allarray
#0"Intern"
#1"Specialist"
#2"Senior Specialist"
#3"Team Lead"
#4"Manager"
#5"Senior Manager"
#6"Director"
#7"VP"
#8"C-Level"
#1null
departmentCollapse all(string | null)
Target department

Any ofCollapse all(string | null)
#0 DepartmentCollapse allstring
Department enumeration.

EnumCollapse allarray
#0"Engineering and Technical"
#1"Sales"
#2"Marketing"
#3"Human Resources"
#4"Finance"
#5"Operations"
#6"Product"
#7"Design"
#8"Legal"
#9"Other"
#1null
company_typeCollapse all(string | null)
Preferred company type

Any ofCollapse all(string | null)
#0 CompanyTypeCollapse allstring
Company type enumeration.

EnumCollapse allarray
#0"Startup"
#1"Privately Held"
#2"Public Company"
#3"Nonprofit"
#4"Government Agency"
#5"Educational Institution"
#1null
company_size_minCollapse all(integer | null)
Minimum company size

Any ofCollapse all(integer | null)
#0integer
#1null
company_size_maxCollapse all(integer | null)
Maximum company size

Any ofCollapse all(integer | null)
#0integer
#1null
is_currently_employedCollapse all(boolean | null)
Filter by employment status

Any ofCollapse all(boolean | null)
#0boolean
#1null
exclude_keywordsCollapse allarray<string>
Keywords to exclude

Itemsstring
max_resultsCollapse allinteger[1, 200]
Maximum number of results

Default50
include_detailed_profilesCollapse allboolean
Include full profile details

Defaultfalse
save_searchCollapse allboolean
Save search for future reference

Defaulttrue
search_descriptionCollapse all(string | null)
Human-readable search description

Any ofCollapse all(string | null)
#0string
#1null
resultsCollapse allarray<object>
Ranked search results

ItemsCollapse allobject
Talent profile with ranking information.

idinteger
full_namestring
headlinestring
linkedin_urlstring
picture_urlCollapse all(string | null)
Profile picture URL

Any ofCollapse all(string | null)
#0string
#1null
primary_professional_emailCollapse all(string | null)
Primary professional email

Any ofCollapse all(string | null)
#0string
#1null
location_fullCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
location_countryCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
active_experience_titleCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
inferred_skillsCollapse allarray<string>
Itemsstring
total_experience_duration_monthsCollapse all(integer | null)
Any ofCollapse all(integer | null)
#0integer
#1null
is_workingCollapse all(boolean | null)
Any ofCollapse all(boolean | null)
#0boolean
#1null
relevance_scoreCollapse allnumber
Overall relevance score (0-100)

skill_match_scoreCollapse allnumber
Skill matching score (0-100)

experience_scoreCollapse allnumber
Experience relevance score (0-100)

location_scoreCollapse allnumber
Location compatibility score (0-100)

ranking_explanationCollapse allstring
Explanation of the ranking

matched_skillsCollapse allarray<string>
Skills that matched the search

Itemsstring
missing_skillsCollapse allarray<string>
Skills that were not found

Itemsstring
key_achievementsCollapse allarray<string>
Key achievements from experience

Itemsstring
relevant_experienceCollapse allarray<string>
Most relevant experience entries

Itemsstring
certificationsCollapse allarray<string>
Relevant certifications

Itemsstring
education_summaryCollapse allstring
Education summary

Default""
career_progressionCollapse allstring
Career progression analysis

Default""
experienceCollapse allarray<object>
Detailed work experience

ItemsCollapse allobject
Individual work experience entry.

active_experienceCollapse allboolean
Whether this is the current active position

position_titleCollapse allstring
Job title/position

departmentCollapse all(string | null)
Department or functional area

Any ofCollapse all(string | null)
#0string
#1null
management_levelCollapse all(string | null)
Management level

Any ofCollapse all(string | null)
#0string
#1null
locationCollapse all(string | null)
Work location

Any ofCollapse all(string | null)
#0string
#1null
descriptionCollapse all(string | null)
Job description and responsibilities

Any ofCollapse all(string | null)
#0string
#1null
date_fromCollapse all(string | null)
Start date (formatted string)

Any ofCollapse all(string | null)
#0string
#1null
date_from_yearCollapse all(integer | null)
Start year

Any ofCollapse all(integer | null)
#0integer
#1null
date_from_monthCollapse all(integer | null)
Start month

Any ofCollapse all(integer | null)
#0integer
#1null
date_toCollapse all(string | null)
End date (formatted string)

Any ofCollapse all(string | null)
#0string
#1null
date_to_yearCollapse all(integer | null)
End year

Any ofCollapse all(integer | null)
#0integer
#1null
date_to_monthCollapse all(integer | null)
End month

Any ofCollapse all(integer | null)
#0integer
#1null
duration_monthsCollapse all(integer | null)
Duration in months

Any ofCollapse all(integer | null)
#0integer
#1null
company_nameCollapse allstring
Company name

company_idCollapse all(integer | null)
Company ID in database

Any ofCollapse all(integer | null)
#0integer
#1null
company_typeCollapse all(string | null)
Type of company

Any ofCollapse all(string | null)
#0string
#1null
company_size_rangeCollapse all(string | null)
Company size range

Any ofCollapse all(string | null)
#0string
#1null
company_employees_countCollapse all(integer | null)
Number of employees

Any ofCollapse all(integer | null)
#0integer
#1null
company_industryCollapse all(string | null)
Company industry

Any ofCollapse all(string | null)
#0string
#1null
company_websiteCollapse all(string | null)
Company website

Any ofCollapse all(string | null)
#0string
#1null
company_linkedin_urlCollapse all(string | null)
Company LinkedIn URL

Any ofCollapse all(string | null)
#0string
#1null
company_hq_countryCollapse all(string | null)
Company headquarters country

Any ofCollapse all(string | null)
#0string
#1null
company_hq_cityCollapse all(string | null)
Company headquarters city

Any ofCollapse all(string | null)
#0string
#1null
order_in_profileCollapse allinteger
Order of this experience in the profile

educationCollapse allarray<object>
Education history

ItemsCollapse allobject
Individual education entry.

degreeCollapse allstring
Degree and field of study

descriptionCollapse all(string | null)
Additional description

Any ofCollapse all(string | null)
#0string
#1null
institution_nameCollapse allstring
Educational institution name

institution_urlCollapse all(string | null)
Institution LinkedIn URL

Any ofCollapse all(string | null)
#0string
#1null
institution_country_iso2Collapse all(string | null)
Institution country ISO2 code

Any ofCollapse all(string | null)
#0string
#1null
institution_cityCollapse all(string | null)
Institution city

Any ofCollapse all(string | null)
#0string
#1null
date_from_yearCollapse all(integer | null)
Start year

Any ofCollapse all(integer | null)
#0integer
#1null
date_to_yearCollapse all(integer | null)
End year

Any ofCollapse all(integer | null)
#0integer
#1null
activities_and_societiesCollapse all(string | null)
Activities and societies

Any ofCollapse all(string | null)
#0string
#1null
order_in_profileCollapse allinteger
Order of this education in the profile

certification_detailsCollapse allarray<object>
Detailed certifications

ItemsCollapse allobject
Individual certification entry.

titleCollapse allstring
Certification title

issuerCollapse allstring
Issuing organization

issuer_urlCollapse all(string | null)
Issuer LinkedIn URL

Any ofCollapse all(string | null)
#0string
#1null
credential_idCollapse all(string | null)
Credential ID

Any ofCollapse all(string | null)
#0string
#1null
certificate_urlCollapse all(string | null)
Certificate URL

Any ofCollapse all(string | null)
#0string
#1null
date_fromCollapse all(string | null)
Issue date

Any ofCollapse all(string | null)
#0string
#1null
date_from_yearCollapse all(integer | null)
Issue year

Any ofCollapse all(integer | null)
#0integer
#1null
date_from_monthCollapse all(integer | null)
Issue month

Any ofCollapse all(integer | null)
#0integer
#1null
date_toCollapse all(string | null)
Expiration date

Any ofCollapse all(string | null)
#0string
#1null
date_to_yearCollapse all(integer | null)
Expiration year

Any ofCollapse all(integer | null)
#0integer
#1null
date_to_monthCollapse all(integer | null)
Expiration month

Any ofCollapse all(integer | null)
#0integer
#1null
order_in_profileCollapse allinteger
Order of this certification in the profile

total_resultsCollapse allinteger
Total number of results found

search_durationCollapse allnumber
Search duration in seconds

timestampCollapse allstringdate-time
Search timestamp

search_summaryCollapse allstring
AI-generated summary of the search

recommendationsCollapse allarray<string>
Search improvement recommendations

Itemsstring
SkillMatchCollapse allobject
Model for skill matching information.

searched_skillCollapse allstring
The skill that was searched for

matched_skillCollapse all(string | null)
The matching skill found in profile

Any ofCollapse all(string | null)
#0string
#1null
match_scoreCollapse allnumber[0, 100]
Match score percentage

match_typeCollapse allstring
Type of match

EnumCollapse allarray
#0"exact"
#1"partial"
#2"similar"
SubscriptionCreateCollapse allobject
tierCollapse allstring
Enumeration of available subscription tiers.

EnumCollapse allarray
#0"basic"
#1"pro"
#2"business"
is_auto_renewCollapse allboolean
Defaultfalse
SubscriptionResponseCollapse allobject
idstring
tierstring
is_auto_renewboolean
price_per_monthnumber
start_dateCollapse all(string | null)
Any ofCollapse all(string | null)
#0stringdate-time
#1null
end_dateCollapse all(string | null)
Any ofCollapse all(string | null)
#0stringdate-time
#1null
last_payment_dateCollapse all(string | null)
Any ofCollapse all(string | null)
#0stringdate-time
#1null
next_payment_dateCollapse all(string | null)
Any ofCollapse all(string | null)
#0stringdate-time
#1null
created_atCollapse all(string | null)
Any ofCollapse all(string | null)
#0stringdate-time
#1null
updated_atCollapse all(string | null)
Any ofCollapse all(string | null)
#0stringdate-time
#1null
SubscriptionStatusCollapse allstring
Enumeration of subscription statuses.

EnumCollapse allarray
#0"active"
#1"canceled"
#2"expired"
#3"suspended"
SubscriptionTierCollapse allstring
Enumeration of available subscription tiers.

EnumCollapse allarray
#0"basic"
#1"pro"
#2"business"
SubscriptionUpdateCollapse allobject
tierCollapse all(string | null)
Any ofCollapse all(string | null)
#0 SubscriptionTierExpand allstring
#1null
statusCollapse all(string | null)
Any ofCollapse all(string | null)
#0 SubscriptionStatusExpand allstring
#1null
is_auto_renewCollapse all(boolean | null)
Any ofCollapse all(boolean | null)
#0boolean
#1null
TalentDetailResponseCollapse allobject
Detailed response model for talent profile

idinteger
parent_idCollapse all(integer | null)
Any ofCollapse all(integer | null)
#0integer
#1null
full_nameCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
first_nameCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
last_nameCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
headlineCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
summaryCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
picture_urlCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
linkedin_urlCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
location_countryCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
location_fullCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
location_regionsCollapse all(array<string> | null)
Any ofCollapse all(array<string> | null)
#0Collapse allarray<string>
Itemsstring
#1null
inferred_skillsCollapse all(array<string> | null)
Any ofCollapse all(array<string> | null)
#0Collapse allarray<string>
Itemsstring
#1null
interestsCollapse all(array<string> | null)
Any ofCollapse all(array<string> | null)
#0Collapse allarray<string>
Itemsstring
#1null
connections_countCollapse all(integer | null)
Any ofCollapse all(integer | null)
#0integer
#1null
followers_countCollapse all(integer | null)
Any ofCollapse all(integer | null)
#0integer
#1null
active_experience_titleCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
active_experience_descriptionCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
active_experience_departmentCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
active_experience_management_levelCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
total_experience_duration_monthsCollapse all(integer | null)
Any ofCollapse all(integer | null)
#0integer
#1null
experienceCollapse all(array<object> | null)
Any ofCollapse all(array<object> | null)
#0Collapse allarray<object>
ItemsCollapse allobject
Additional propertiesallowed
#1null
educationCollapse all(array<object> | null)
Any ofCollapse all(array<object> | null)
#0Collapse allarray<object>
ItemsCollapse allobject
Additional propertiesallowed
#1null
certificationsCollapse all(array<object> | null)
Any ofCollapse all(array<object> | null)
#0Collapse allarray<object>
ItemsCollapse allobject
Additional propertiesallowed
#1null
is_workingCollapse all(boolean | null)
Any ofCollapse all(boolean | null)
#0boolean
#1null
is_decision_makerCollapse all(boolean | null)
Any ofCollapse all(boolean | null)
#0boolean
#1null
imported_atCollapse all(string | null)
Any ofCollapse all(string | null)
#0stringdate-time
#1null
TalentProfileCollapse allobject
Complete talent profile model.

idCollapse allinteger
Unique talent ID

parent_idCollapse all(integer | null)
Parent profile ID if applicable

Any ofCollapse all(integer | null)
#0integer
#1null
full_nameCollapse allstring
Full name

first_nameCollapse all(string | null)
First name

Any ofCollapse all(string | null)
#0string
#1null
last_nameCollapse all(string | null)
Last name

Any ofCollapse all(string | null)
#0string
#1null
headlineCollapse allstring
Professional headline

summaryCollapse all(string | null)
Professional summary

Any ofCollapse all(string | null)
#0string
#1null
picture_urlCollapse all(string | null)
Profile picture URL

Any ofCollapse all(string | null)
#0string
#1null
linkedin_urlCollapse allstring
LinkedIn profile URL

location_countryCollapse all(string | null)
Country

Any ofCollapse all(string | null)
#0string
#1null
location_fullCollapse all(string | null)
Full location string

Any ofCollapse all(string | null)
#0string
#1null
location_regionsCollapse allarray<string>
Geographic regions

Itemsstring
inferred_skillsCollapse allarray<string>
Inferred skills

Itemsstring
interestsCollapse allarray<string>
Professional interests

Itemsstring
connections_countCollapse all(integer | null)
Number of LinkedIn connections

Any ofCollapse all(integer | null)
#0integer
#1null
followers_countCollapse all(integer | null)
Number of LinkedIn followers

Any ofCollapse all(integer | null)
#0integer
#1null
active_experience_titleCollapse all(string | null)
Current job title

Any ofCollapse all(string | null)
#0string
#1null
active_experience_company_idCollapse all(integer | null)
Current company ID

Any ofCollapse all(integer | null)
#0integer
#1null
active_experience_descriptionCollapse all(string | null)
Current job description

Any ofCollapse all(string | null)
#0string
#1null
active_experience_departmentCollapse all(string | null)
Current department

Any ofCollapse all(string | null)
#0string
#1null
active_experience_management_levelCollapse all(string | null)
Current management level

Any ofCollapse all(string | null)
#0string
#1null
total_experience_duration_monthsCollapse all(integer | null)
Total experience in months

Any ofCollapse all(integer | null)
#0integer
#1null
experienceCollapse allarray<object>
Work experience entries

ItemsCollapse allobject
Individual work experience entry.

active_experienceCollapse allboolean
Whether this is the current active position

position_titleCollapse allstring
Job title/position

departmentCollapse all(string | null)
Department or functional area

Any ofCollapse all(string | null)
#0string
#1null
management_levelCollapse all(string | null)
Management level

Any ofCollapse all(string | null)
#0string
#1null
locationCollapse all(string | null)
Work location

Any ofCollapse all(string | null)
#0string
#1null
descriptionCollapse all(string | null)
Job description and responsibilities

Any ofCollapse all(string | null)
#0string
#1null
date_fromCollapse all(string | null)
Start date (formatted string)

Any ofCollapse all(string | null)
#0string
#1null
date_from_yearCollapse all(integer | null)
Start year

Any ofCollapse all(integer | null)
#0integer
#1null
date_from_monthCollapse all(integer | null)
Start month

Any ofCollapse all(integer | null)
#0integer
#1null
date_toCollapse all(string | null)
End date (formatted string)

Any ofCollapse all(string | null)
#0string
#1null
date_to_yearCollapse all(integer | null)
End year

Any ofCollapse all(integer | null)
#0integer
#1null
date_to_monthCollapse all(integer | null)
End month

Any ofCollapse all(integer | null)
#0integer
#1null
duration_monthsCollapse all(integer | null)
Duration in months

Any ofCollapse all(integer | null)
#0integer
#1null
company_nameCollapse allstring
Company name

company_idCollapse all(integer | null)
Company ID in database

Any ofCollapse all(integer | null)
#0integer
#1null
company_typeCollapse all(string | null)
Type of company

Any ofCollapse all(string | null)
#0string
#1null
company_size_rangeCollapse all(string | null)
Company size range

Any ofCollapse all(string | null)
#0string
#1null
company_employees_countCollapse all(integer | null)
Number of employees

Any ofCollapse all(integer | null)
#0integer
#1null
company_industryCollapse all(string | null)
Company industry

Any ofCollapse all(string | null)
#0string
#1null
company_websiteCollapse all(string | null)
Company website

Any ofCollapse all(string | null)
#0string
#1null
company_linkedin_urlCollapse all(string | null)
Company LinkedIn URL

Any ofCollapse all(string | null)
#0string
#1null
company_hq_countryCollapse all(string | null)
Company headquarters country

Any ofCollapse all(string | null)
#0string
#1null
company_hq_cityCollapse all(string | null)
Company headquarters city

Any ofCollapse all(string | null)
#0string
#1null
order_in_profileCollapse allinteger
Order of this experience in the profile

educationCollapse allarray<object>
Education entries

ItemsCollapse allobject
Individual education entry.

degreeCollapse allstring
Degree and field of study

descriptionCollapse all(string | null)
Additional description

Any ofCollapse all(string | null)
#0string
#1null
institution_nameCollapse allstring
Educational institution name

institution_urlCollapse all(string | null)
Institution LinkedIn URL

Any ofCollapse all(string | null)
#0string
#1null
institution_country_iso2Collapse all(string | null)
Institution country ISO2 code

Any ofCollapse all(string | null)
#0string
#1null
institution_cityCollapse all(string | null)
Institution city

Any ofCollapse all(string | null)
#0string
#1null
date_from_yearCollapse all(integer | null)
Start year

Any ofCollapse all(integer | null)
#0integer
#1null
date_to_yearCollapse all(integer | null)
End year

Any ofCollapse all(integer | null)
#0integer
#1null
activities_and_societiesCollapse all(string | null)
Activities and societies

Any ofCollapse all(string | null)
#0string
#1null
order_in_profileCollapse allinteger
Order of this education in the profile

certificationsCollapse allarray<object>
Certification entries

ItemsCollapse allobject
Individual certification entry.

titleCollapse allstring
Certification title

issuerCollapse allstring
Issuing organization

issuer_urlCollapse all(string | null)
Issuer LinkedIn URL

Any ofCollapse all(string | null)
#0string
#1null
credential_idCollapse all(string | null)
Credential ID

Any ofCollapse all(string | null)
#0string
#1null
certificate_urlCollapse all(string | null)
Certificate URL

Any ofCollapse all(string | null)
#0string
#1null
date_fromCollapse all(string | null)
Issue date

Any ofCollapse all(string | null)
#0string
#1null
date_from_yearCollapse all(integer | null)
Issue year

Any ofCollapse all(integer | null)
#0integer
#1null
date_from_monthCollapse all(integer | null)
Issue month

Any ofCollapse all(integer | null)
#0integer
#1null
date_toCollapse all(string | null)
Expiration date

Any ofCollapse all(string | null)
#0string
#1null
date_to_yearCollapse all(integer | null)
Expiration year

Any ofCollapse all(integer | null)
#0integer
#1null
date_to_monthCollapse all(integer | null)
Expiration month

Any ofCollapse all(integer | null)
#0integer
#1null
order_in_profileCollapse allinteger
Order of this certification in the profile

is_workingCollapse all(boolean | null)
Currently employed

Any ofCollapse all(boolean | null)
#0boolean
#1null
is_decision_makerCollapse all(boolean | null)
Is a decision maker

Any ofCollapse all(boolean | null)
#0boolean
#1null
imported_atCollapse all(string | null)
When the profile was imported

Any ofCollapse all(string | null)
#0stringdate-time
#1null
updated_atCollapse all(string | null)
Last update timestamp

Any ofCollapse all(string | null)
#0stringdate-time
#1null
TalentProfileResponseCollapse allobject
Response model for individual talent profile

idinteger
full_nameCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
headlineCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
location_fullCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
active_experience_titleCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
active_experience_company_idCollapse all(integer | null)
Any ofCollapse all(integer | null)
#0integer
#1null
linkedin_urlCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
summaryCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
inferred_skillsCollapse all(array<string> | null)
Any ofCollapse all(array<string> | null)
#0Collapse allarray<string>
Itemsstring
#1null
connections_countCollapse all(integer | null)
Any ofCollapse all(integer | null)
#0integer
#1null
followers_countCollapse all(integer | null)
Any ofCollapse all(integer | null)
#0integer
#1null
total_experience_duration_monthsCollapse all(integer | null)
Any ofCollapse all(integer | null)
#0integer
#1null
is_workingCollapse all(boolean | null)
Any ofCollapse all(boolean | null)
#0boolean
#1null
TalentSearchCriteriaCollapse allobject
Criteria for searching talents.

job_titlesCollapse allarray<string>
Target job titles

Itemsstring
skills_keywordsCollapse allarray<string>
Required or preferred skills

Itemsstring
location_fullCollapse all(string | null)
Full location string

Any ofCollapse all(string | null)
#0string
#1null
location_countryCollapse all(string | null)
Country filter

Any ofCollapse all(string | null)
#0string
#1null
location_country_iso2Collapse all(string | null)
Country ISO2 code

Any ofCollapse all(string | null)
#0string
#1null
experience_years_minCollapse all(integer | null)
Minimum years of experience

Any ofCollapse all(integer | null)
#0integer
#1null
experience_years_maxCollapse all(integer | null)
Maximum years of experience

Any ofCollapse all(integer | null)
#0integer
#1null
management_levelCollapse all(string | null)
Target management level

Any ofCollapse all(string | null)
#0 ManagementLevelExpand allstring
#1null
departmentCollapse all(string | null)
Target department

Any ofCollapse all(string | null)
#0 DepartmentExpand allstring
#1null
company_typeCollapse all(string | null)
Preferred company type

Any ofCollapse all(string | null)
#0 CompanyTypeExpand allstring
#1null
company_size_minCollapse all(integer | null)
Minimum company size

Any ofCollapse all(integer | null)
#0integer
#1null
company_size_maxCollapse all(integer | null)
Maximum company size

Any ofCollapse all(integer | null)
#0integer
#1null
is_currently_employedCollapse all(boolean | null)
Filter by employment status

Any ofCollapse all(boolean | null)
#0boolean
#1null
exclude_keywordsCollapse allarray<string>
Keywords to exclude

Itemsstring
TalentSearchResponseCollapse allobject
Response model for talent search

search_idinteger
talent_idsCollapse allarray<integer>
Itemsinteger
total_countinteger
statusstring
messagestring
UserCreateCollapse allobject
Model for user creation request.

emailCollapse allstringemail
User email address

usernameCollapse all(string | null)
Username (3-30 chars, alphanumeric, hyphens, underscores, dots)

Any ofCollapse all(string | null)
#0string
#1null
passwordCollapse allstring≥ 8 characters
User password

full_nameCollapse all(string | null)
Full name

Any ofCollapse all(string | null)
#0string
#1null
companyCollapse all(string | null)
Company name

Any ofCollapse all(string | null)
#0string
#1null
job_titleCollapse all(string | null)
Job title

Any ofCollapse all(string | null)
#0string
#1null
departmentCollapse all(string | null)
Department

Any ofCollapse all(string | null)
#0string
#1null
phoneCollapse all(string | null)
Phone number

Any ofCollapse all(string | null)
#0string
#1null
UserResponseCollapse allobject
Model for user response data.

idCollapse allstring
User ID

emailCollapse allstring
User email address

usernameCollapse all(string | null)
Username

Any ofCollapse all(string | null)
#0string
#1null
full_nameCollapse all(string | null)
Full name

Any ofCollapse all(string | null)
#0string
#1null
companyCollapse all(string | null)
Company name

Any ofCollapse all(string | null)
#0string
#1null
job_titleCollapse all(string | null)
Job title

Any ofCollapse all(string | null)
#0string
#1null
is_activeCollapse allboolean
Whether user is active

is_verifiedCollapse allboolean
Whether email is verified

is_premiumCollapse allboolean
Whether user has premium subscription

subscription_tierCollapse allstring
Subscription tier

monthly_search_limitCollapse allinteger
Monthly search limit

monthly_searches_usedCollapse allinteger
Monthly searches used

created_atCollapse allstringdate-time
Account creation timestamp

UserUpdateCollapse allobject
Model for user update request.

usernameCollapse all(string | null)
Username (3-30 chars, alphanumeric, hyphens, underscores, dots)

Any ofCollapse all(string | null)
#0string
#1null
full_nameCollapse all(string | null)
Full name

Any ofCollapse all(string | null)
#0string
#1null
companyCollapse all(string | null)
Company name

Any ofCollapse all(string | null)
#0string
#1null
job_titleCollapse all(string | null)
Job title

Any ofCollapse all(string | null)
#0string
#1null
UserWithSubscriptionResponseCollapse allobject
Model for user response with subscription information.

idCollapse allstring
User ID

emailCollapse allstring
User email address

usernameCollapse all(string | null)
Username

Any ofCollapse all(string | null)
#0string
#1null
full_nameCollapse all(string | null)
Full name

Any ofCollapse all(string | null)
#0string
#1null
companyCollapse all(string | null)
Company name

Any ofCollapse all(string | null)
#0string
#1null
job_titleCollapse all(string | null)
Job title

Any ofCollapse all(string | null)
#0string
#1null
is_activeCollapse allboolean
Whether user is active

is_verifiedCollapse allboolean
Whether email is verified

is_premiumCollapse allboolean
Whether user has premium subscription

subscription_tierCollapse allstring
Subscription tier

monthly_search_limitCollapse allinteger
Monthly search limit

monthly_searches_usedCollapse allinteger
Monthly searches used

created_atCollapse allstringdate-time
Account creation timestamp

subscriptionCollapse all(object | null)
User subscription details

Any ofCollapse all(object | null)
#0Collapse allobject
Additional propertiesallowed
#1null
UserWithTokenCollapse allobject
Model for user response with authentication tokens.

idCollapse allstring
User ID

emailCollapse allstring
User email address

usernameCollapse all(string | null)
Username

Any ofCollapse all(string | null)
#0string
#1null
full_nameCollapse all(string | null)
Full name

Any ofCollapse all(string | null)
#0string
#1null
companyCollapse all(string | null)
Company name

Any ofCollapse all(string | null)
#0string
#1null
job_titleCollapse all(string | null)
Job title

Any ofCollapse all(string | null)
#0string
#1null
is_activeCollapse allboolean
Whether user is active

is_verifiedCollapse allboolean
Whether email is verified

is_premiumCollapse allboolean
Whether user has premium subscription

subscription_tierCollapse allstring
Subscription tier

monthly_search_limitCollapse allinteger
Monthly search limit

monthly_searches_usedCollapse allinteger
Monthly searches used

created_atCollapse allstringdate-time
Account creation timestamp

access_tokenCollapse allstring
JWT access token

refresh_tokenCollapse allstring
JWT refresh token

token_typeCollapse allstring
Token type

Default"bearer"
session_idCollapse all(string | null)
Session ID

Any ofCollapse all(string | null)
#0string
#1null
ValidationErrorCollapse allobject
locCollapse allarray<(string | integer)>
ItemsCollapse all(string | integer)
Any ofCollapse all(string | integer)
#0string
#1integer
msgstring
typestring
RankedTalentProfileCollapse allobject
Model for a ranked talent profile with scoring details.

profileCollapse allany
The talent profile

$ref#/components/schemas/TalentProfile
rank_positionCollapse allinteger≥ 1
Rank position in results

relevance_scoreCollapse allnumber[0, 100]
Overall relevance score

skill_match_scoreCollapse allnumber[0, 100]
Skills matching score

experience_scoreCollapse allnumber[0, 100]
Experience level score

location_scoreCollapse allnumber[0, 100]
Location matching score

job_title_scoreCollapse allnumber[0, 100]
Job title matching score

matched_skillsCollapse allarray<any>
List of matched skills

ItemsCollapse allany
$ref#/components/schemas/SkillMatch
missing_skillsCollapse allarray<string>
Skills from criteria not found

Itemsstring
ranking_explanationCollapse allstring
Human-readable ranking explanation

key_achievementsCollapse allarray<string>
Key achievements from experience

Itemsstring
relevant_experienceCollapse allarray<string>
Most relevant experience entries

Itemsstring
certificationsCollapse allarray<string>
Relevant certifications

Itemsstring
education_summaryCollapse allstring
Education summary

Default""
career_progressionCollapse allstring
Career progression analysis

Default""
source_typeCollapse allstring
Source of the profile

EnumCollapse allarray
#0"database"
#1"live"
#2"hybrid"
source_detailsCollapse all(object | null)
Additional source information

Any ofCollapse all(object | null)
#0Collapse allobject
Additional propertiesallowed
#1null
RankedTalentProfileCollapse allobject
Talent profile with ranking information.

idinteger
full_namestring
headlinestring
linkedin_urlstring
picture_urlCollapse all(string | null)
Profile picture URL

Any ofCollapse all(string | null)
#0string
#1null
primary_professional_emailCollapse all(string | null)
Primary professional email

Any ofCollapse all(string | null)
#0string
#1null
location_fullCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
location_countryCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
active_experience_titleCollapse all(string | null)
Any ofCollapse all(string | null)
#0string
#1null
inferred_skillsCollapse allarray<string>
Itemsstring
total_experience_duration_monthsCollapse all(integer | null)
Any ofCollapse all(integer | null)
#0integer
#1null
is_workingCollapse all(boolean | null)
Any ofCollapse all(boolean | null)
#0boolean
#1null
relevance_scoreCollapse allnumber
Overall relevance score (0-100)

skill_match_scoreCollapse allnumber
Skill matching score (0-100)

experience_scoreCollapse allnumber
Experience relevance score (0-100)

location_scoreCollapse allnumber
Location compatibility score (0-100)

ranking_explanationCollapse allstring
Explanation of the ranking

matched_skillsCollapse allarray<string>
Skills that matched the search

Itemsstring
missing_skillsCollapse allarray<string>
Skills that were not found

Itemsstring
key_achievementsCollapse allarray<string>
Key achievements from experience

Itemsstring
relevant_experienceCollapse allarray<string>
Most relevant experience entries

Itemsstring
certificationsCollapse allarray<string>
Relevant certifications

Itemsstring
education_summaryCollapse allstring
Education summary

Default""
career_progressionCollapse allstring
Career progression analysis

Default""
experienceCollapse allarray<object>
Detailed work experience

ItemsCollapse allobject
Individual work experience entry.

active_experienceCollapse allboolean
Whether this is the current active position

position_titleCollapse allstring
Job title/position

departmentCollapse all(string | null)
Department or functional area

Any ofCollapse all(string | null)
#0string
#1null
management_levelCollapse all(string | null)
Management level

Any ofCollapse all(string | null)
#0string
#1null
locationCollapse all(string | null)
Work location

Any ofCollapse all(string | null)
#0string
#1null
descriptionCollapse all(string | null)
Job description and responsibilities

Any ofCollapse all(string | null)
#0string
#1null
date_fromCollapse all(string | null)
Start date (formatted string)

Any ofCollapse all(string | null)
#0string
#1null
date_from_yearCollapse all(integer | null)
Start year

Any ofCollapse all(integer | null)
#0integer
#1null
date_from_monthCollapse all(integer | null)
Start month

Any ofCollapse all(integer | null)
#0integer
#1null
date_toCollapse all(string | null)
End date (formatted string)

Any ofCollapse all(string | null)
#0string
#1null
date_to_yearCollapse all(integer | null)
End year

Any ofCollapse all(integer | null)
#0integer
#1null
date_to_monthCollapse all(integer | null)
End month

Any ofCollapse all(integer | null)
#0integer
#1null
duration_monthsCollapse all(integer | null)
Duration in months

Any ofCollapse all(integer | null)
#0integer
#1null
company_nameCollapse allstring
Company name

company_idCollapse all(integer | null)
Company ID in database

Any ofCollapse all(integer | null)
#0integer
#1null
company_typeCollapse all(string | null)
Type of company

Any ofCollapse all(string | null)
#0string
#1null
company_size_rangeCollapse all(string | null)
Company size range

Any ofCollapse all(string | null)
#0string
#1null
company_employees_countCollapse all(integer | null)
Number of employees

Any ofCollapse all(integer | null)
#0integer
#1null
company_industryCollapse all(string | null)
Company industry

Any ofCollapse all(string | null)
#0string
#1null
company_websiteCollapse all(string | null)
Company website

Any ofCollapse all(string | null)
#0string
#1null
company_linkedin_urlCollapse all(string | null)
Company LinkedIn URL

Any ofCollapse all(string | null)
#0string
#1null
company_hq_countryCollapse all(string | null)
Company headquarters country

Any ofCollapse all(string | null)
#0string
#1null
company_hq_cityCollapse all(string | null)
Company headquarters city

Any ofCollapse all(string | null)
#0string
#1null
order_in_profileCollapse allinteger
Order of this experience in the profile

educationCollapse allarray<object>
Education history

ItemsCollapse allobject
Individual education entry.

degreeCollapse allstring
Degree and field of study

descriptionCollapse all(string | null)
Additional description

Any ofCollapse all(string | null)
#0string
#1null
institution_nameCollapse allstring
Educational institution name

institution_urlCollapse all(string | null)
Institution LinkedIn URL

Any ofCollapse all(string | null)
#0string
#1null
institution_country_iso2Collapse all(string | null)
Institution country ISO2 code

Any ofCollapse all(string | null)
#0string
#1null
institution_cityCollapse all(string | null)
Institution city

Any ofCollapse all(string | null)
#0string
#1null
date_from_yearCollapse all(integer | null)
Start year

Any ofCollapse all(integer | null)
#0integer
#1null
date_to_yearCollapse all(integer | null)
End year

Any ofCollapse all(integer | null)
#0integer
#1null
activities_and_societiesCollapse all(string | null)
Activities and societies

Any ofCollapse all(string | null)
#0string
#1null
order_in_profileCollapse allinteger
Order of this education in the profile

certification_detailsCollapse allarray<object>
Detailed certifications

ItemsCollapse allobject
Individual certification entry.

titleCollapse allstring
Certification title

issuerCollapse allstring
Issuing organization

issuer_urlCollapse all(string | null)
Issuer LinkedIn URL

Any ofCollapse all(string | null)
#0string
#1null
credential_idCollapse all(string | null)
Credential ID

Any ofCollapse all(string | null)
#0string
#1null
certificate_urlCollapse all(string | null)
Certificate URL

Any ofCollapse all(string | null)
#0string
#1null
date_fromCollapse all(string | null)
Issue date

Any ofCollapse all(string | null)
#0string
#1null
date_from_yearCollapse all(integer | null)
Issue year

Any ofCollapse all(integer | null)
#0integer
#1null
date_from_monthCollapse all(integer | null)
Issue month

Any ofCollapse all(integer | null)
#0integer
#1null
date_toCollapse all(string | null)
Expiration date

Any ofCollapse all(string | null)
#0string
#1null
date_to_yearCollapse all(integer | null)
Expiration year

Any ofCollapse all(integer | null)
#0integer
#1null
date_to_monthCollapse all(integer | null)
Expiration month

Any ofCollapse all(integer | null)
#0integer
#1null
order_in_profileCollapse allinteger
Order of this certification in the profile