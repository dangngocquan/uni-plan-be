
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/": {
        "get": {
          "operationId": "AppController_getHello",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "app"
          ]
        }
      },
      "/api/school": {
        "get": {
          "operationId": "SchoolController_getSchools",
          "parameters": [
            {
              "name": "order",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "enum": [
                  "ASC",
                  "DESC"
                ],
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "type": "number"
              }
            },
            {
              "name": "q",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get all schools",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PaginationSchoolDto"
                  }
                }
              }
            }
          },
          "tags": [
            "school"
          ]
        },
        "post": {
          "operationId": "SchoolController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReqCreateSchoolDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Create a new school",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResSchoolDto"
                  }
                }
              }
            }
          },
          "tags": [
            "school"
          ]
        }
      },
      "/api/school/{schoolId}": {
        "put": {
          "operationId": "SchoolController_update",
          "parameters": [
            {
              "name": "schoolId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/reqUpdateSchoolDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Update a school",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResSchoolDto"
                  }
                }
              }
            }
          },
          "tags": [
            "school"
          ]
        },
        "delete": {
          "operationId": "SchoolController_delete",
          "parameters": [
            {
              "name": "schoolId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Delete a school",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResDeleteResultDto"
                  }
                }
              }
            }
          },
          "tags": [
            "school"
          ]
        }
      },
      "/api/major": {
        "get": {
          "operationId": "MajorController_get",
          "parameters": [
            {
              "name": "order",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "enum": [
                  "ASC",
                  "DESC"
                ],
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "type": "number"
              }
            },
            {
              "name": "q",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "type": "string"
              }
            },
            {
              "name": "schoolId",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get all major",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PaginationMajorDto"
                  }
                }
              }
            }
          },
          "tags": [
            "major"
          ]
        },
        "post": {
          "operationId": "MajorController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReqCreateMajorDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Create a new major",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResMajorDto"
                  }
                }
              }
            }
          },
          "tags": [
            "major"
          ]
        }
      },
      "/api/major/{majorId}": {
        "put": {
          "operationId": "MajorController_update",
          "parameters": [
            {
              "name": "majorId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReqUpdateMajorDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Update a major",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResMajorDto"
                  }
                }
              }
            }
          },
          "tags": [
            "major"
          ]
        },
        "delete": {
          "operationId": "MajorController_delete",
          "parameters": [
            {
              "name": "majorId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Delete a major",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResDeleteResultDto"
                  }
                }
              }
            }
          },
          "tags": [
            "major"
          ]
        }
      },
      "/api/major/detail/{majorId}": {
        "get": {
          "operationId": "MajorController_getDetails",
          "parameters": [
            {
              "name": "majorId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get details of a major",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResMajorDetailDto"
                  }
                }
              }
            }
          },
          "tags": [
            "major"
          ]
        }
      },
      "/api/group-course": {
        "get": {
          "operationId": "GroupCourseController_getGroups",
          "parameters": [
            {
              "name": "order",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "enum": [
                  "ASC",
                  "DESC"
                ],
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "type": "number"
              }
            },
            {
              "name": "q",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "type": "string"
              }
            },
            {
              "name": "majorId",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "schoolId",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "type",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "enum": [
                  "ALL_SELECTION",
                  "SINGLE_SELECT",
                  "MULTIPLE_SELECTION"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get Group Course",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PaginationGroupCourseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "group-course"
          ]
        },
        "post": {
          "operationId": "GroupCourseController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReqCreateGroupCourseDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Create a new group course",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResGroupCourseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "group-course"
          ]
        }
      },
      "/api/group-course/{groupId}": {
        "put": {
          "operationId": "GroupCourseController_update",
          "parameters": [
            {
              "name": "groupId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReqUpdateGroupCourseDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Update a group course",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResGroupCourseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "group-course"
          ]
        },
        "delete": {
          "operationId": "GroupCourseController_delete",
          "parameters": [
            {
              "name": "groupId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Delete a group course",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResDeleteResultDto"
                  }
                }
              }
            }
          },
          "tags": [
            "group-course"
          ]
        }
      },
      "/api/group-course/relation": {
        "post": {
          "operationId": "GroupCourseController_addRelation",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReqCreateGroupRelationDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Create a new group relation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResGroupRelationDto"
                  }
                }
              }
            }
          },
          "tags": [
            "group-course"
          ]
        }
      },
      "/api/group-course/details/{groupId}": {
        "get": {
          "operationId": "GroupCourseController_getGroupCourseDetails",
          "parameters": [
            {
              "name": "groupId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get group course details",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResGroupCourseDetailDto"
                  }
                }
              }
            }
          },
          "tags": [
            "group-course"
          ]
        }
      },
      "/api/course": {
        "get": {
          "operationId": "CourseController_get",
          "parameters": [
            {
              "name": "order",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "enum": [
                  "ASC",
                  "DESC"
                ],
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "type": "number"
              }
            },
            {
              "name": "q",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": false,
              "in": "query",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            {
              "name": "code",
              "required": false,
              "in": "query",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            {
              "name": "name",
              "required": false,
              "in": "query",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            {
              "name": "credits",
              "required": false,
              "in": "query",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            {
              "name": "groupId",
              "required": false,
              "in": "query",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get all courses",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PaginationCourseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "course"
          ]
        },
        "post": {
          "operationId": "CourseController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReqCreateCourseDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Create a new course",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResCourseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "course"
          ]
        }
      },
      "/api/course/{courseId}": {
        "put": {
          "operationId": "CourseController_update",
          "parameters": [
            {
              "name": "courseId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReqUpdateCourseDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Update a course",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResCourseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "course"
          ]
        },
        "delete": {
          "operationId": "CourseController_delete",
          "parameters": [
            {
              "name": "courseId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Delete a course",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResDeleteResultDto"
                  }
                }
              }
            }
          },
          "tags": [
            "course"
          ]
        }
      },
      "/api/course/{courseId}/relation": {
        "post": {
          "operationId": "CourseController_addPrereqCourse",
          "parameters": [
            {
              "name": "courseId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReqCreateCourseRelationDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Add a prereq course",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResCourseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "course"
          ]
        }
      },
      "/api/grade-conversion/table": {
        "get": {
          "operationId": "GradeConversionController_getGradeConversionTables",
          "parameters": [
            {
              "name": "order",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "enum": [
                  "ASC",
                  "DESC"
                ],
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "type": "number"
              }
            },
            {
              "name": "q",
              "required": false,
              "in": "query",
              "schema": {
                "nullable": true,
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get all grade conversion tables",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PaginationConversionTableDto"
                  }
                }
              }
            }
          },
          "tags": [
            "grade-conversion"
          ]
        },
        "post": {
          "operationId": "GradeConversionController_createTable",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReqCreateGradeConversionTableDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Create a grade conversion table",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResGradeConversionTableDto"
                  }
                }
              }
            }
          },
          "tags": [
            "grade-conversion"
          ]
        }
      },
      "/api/grade-conversion/table/{tableId}": {
        "put": {
          "operationId": "GradeConversionController_updateTable",
          "parameters": [
            {
              "name": "tableId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReqCreateGradeConversionTableDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Update a grade conversion table",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResGradeConversionTableDto"
                  }
                }
              }
            }
          },
          "tags": [
            "grade-conversion"
          ]
        },
        "delete": {
          "operationId": "GradeConversionController_deleteGradeConversionTable",
          "parameters": [
            {
              "name": "tableId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Delete a grade conversion table",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResDeleteResultDto"
                  }
                }
              }
            }
          },
          "tags": [
            "grade-conversion"
          ]
        }
      },
      "/api/auth/signup": {
        "post": {
          "operationId": "AuthController_signup",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReqSignUpDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "User sign up.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResMailDto"
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/api/auth/verify-signup": {
        "post": {
          "operationId": "AuthController_verifySignup",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReqVerifyEmailDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Verify email when user sign up.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResTokenDto"
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/api/auth/login": {
        "post": {
          "operationId": "AuthController_login",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReqLoginDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "User login.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResTokenDto"
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/api/auth/refresh-token": {
        "post": {
          "operationId": "AuthController_refreshToken",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReqRefreshTokenDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Refresh token.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResTokenDto"
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/api/auth/google": {
        "post": {
          "operationId": "AuthController_authGoogle",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReqGoogleTokenDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Auth google.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResTokenDto"
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/api/auth/forgot-password": {
        "post": {
          "operationId": "AuthController_forgotPassword",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReqForgotPasswordDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Forget password.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResMailDto"
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/api/auth/reset-password": {
        "post": {
          "operationId": "AuthController_resetPassword",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReqResetPasswordDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Reset password.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResTokenDto"
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ]
        }
      }
    },
    "info": {
      "title": "API Documentation",
      "description": "API description",
      "version": "1.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "schemas": {
        "PaginationMetaDto": {
          "type": "object",
          "properties": {
            "itemCount": {
              "type": "number"
            },
            "totalItems": {
              "type": "number"
            },
            "itemsPerPage": {
              "type": "number"
            },
            "totalPages": {
              "type": "number"
            },
            "currentPage": {
              "type": "number"
            }
          },
          "required": [
            "itemCount",
            "totalItems",
            "itemsPerPage",
            "totalPages",
            "currentPage"
          ]
        },
        "PaginationLinkDto": {
          "type": "object",
          "properties": {
            "first": {
              "type": "string"
            },
            "previous": {
              "type": "string"
            },
            "next": {
              "type": "string"
            },
            "last": {
              "type": "string"
            }
          },
          "required": [
            "first",
            "previous",
            "next",
            "last"
          ]
        },
        "ResSchoolDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "name"
          ]
        },
        "PaginationSchoolDto": {
          "type": "object",
          "properties": {
            "meta": {
              "$ref": "#/components/schemas/PaginationMetaDto"
            },
            "links": {
              "$ref": "#/components/schemas/PaginationLinkDto"
            },
            "items": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ResSchoolDto"
              }
            }
          },
          "required": [
            "meta",
            "links",
            "items"
          ]
        },
        "ReqCreateSchoolDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            }
          },
          "required": [
            "name"
          ]
        },
        "reqUpdateSchoolDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            }
          },
          "required": [
            "name"
          ]
        },
        "ResDeleteResultDto": {
          "type": "object",
          "properties": {
            "raw": {
              "type": "object"
            },
            "affected": {
              "type": "number"
            }
          },
          "required": [
            "raw",
            "affected"
          ]
        },
        "ResMajorDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "schoolId": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "name",
            "schoolId"
          ]
        },
        "PaginationMajorDto": {
          "type": "object",
          "properties": {
            "meta": {
              "$ref": "#/components/schemas/PaginationMetaDto"
            },
            "links": {
              "$ref": "#/components/schemas/PaginationLinkDto"
            },
            "items": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ResMajorDto"
              }
            }
          },
          "required": [
            "meta",
            "links",
            "items"
          ]
        },
        "ReqCreateMajorDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "schoolId": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "schoolId"
          ]
        },
        "ReqUpdateMajorDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            }
          },
          "required": [
            "name"
          ]
        },
        "ResGroupCourseDetailDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "type": {
              "type": "string"
            },
            "minCredits": {
              "type": "number"
            },
            "minCourses": {
              "type": "number"
            },
            "minGroups": {
              "type": "number"
            },
            "majorId": {
              "type": "string"
            },
            "title": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "children": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ResGroupCourseDetailDto"
              }
            }
          },
          "required": [
            "id",
            "type",
            "minCredits",
            "minCourses",
            "minGroups",
            "majorId",
            "title",
            "description",
            "children"
          ]
        },
        "ResMajorDetailDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "schoolId": {
              "type": "string"
            },
            "groupCourses": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ResGroupCourseDetailDto"
              }
            }
          },
          "required": [
            "id",
            "name",
            "schoolId",
            "groupCourses"
          ]
        },
        "ResGroupCourseDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "type": {
              "type": "string"
            },
            "minCredits": {
              "type": "number"
            },
            "minCourses": {
              "type": "number"
            },
            "minGroups": {
              "type": "number"
            },
            "majorId": {
              "type": "string"
            },
            "title": {
              "type": "string"
            },
            "description": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "type",
            "minCredits",
            "minCourses",
            "minGroups",
            "majorId",
            "title",
            "description"
          ]
        },
        "PaginationGroupCourseDto": {
          "type": "object",
          "properties": {
            "meta": {
              "$ref": "#/components/schemas/PaginationMetaDto"
            },
            "links": {
              "$ref": "#/components/schemas/PaginationLinkDto"
            },
            "items": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ResGroupCourseDto"
              }
            }
          },
          "required": [
            "meta",
            "links",
            "items"
          ]
        },
        "ReqCreateGroupCourseDto": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "ALL_SELECTION",
                "SINGLE_SELECT",
                "MULTIPLE_SELECTION"
              ]
            },
            "minCredits": {
              "type": "number",
              "nullable": true
            },
            "minCourses": {
              "type": "number",
              "nullable": true
            },
            "minGroups": {
              "type": "number",
              "nullable": true
            },
            "majorId": {
              "type": "string"
            },
            "title": {
              "type": "string",
              "nullable": true
            },
            "description": {
              "type": "string",
              "nullable": true
            },
            "parentGroupId": {
              "type": "string",
              "nullable": true,
              "example": "null | string"
            }
          },
          "required": [
            "type",
            "minCredits",
            "minCourses",
            "minGroups",
            "majorId",
            "title",
            "description"
          ]
        },
        "ReqUpdateGroupCourseDto": {
          "type": "object",
          "properties": {
            "minCredits": {
              "type": "number",
              "nullable": true,
              "minimum": 0
            },
            "minCourses": {
              "type": "number",
              "nullable": true,
              "minimum": 0
            },
            "minGroups": {
              "type": "number",
              "nullable": true,
              "minimum": 0
            },
            "title": {
              "type": "string",
              "nullable": true
            },
            "description": {
              "type": "string",
              "nullable": true
            }
          },
          "required": [
            "minCredits",
            "minCourses",
            "minGroups",
            "title",
            "description"
          ]
        },
        "ReqCreateGroupRelationDto": {
          "type": "object",
          "properties": {
            "groupId": {
              "type": "string"
            },
            "parentGroupId": {
              "type": "string"
            }
          },
          "required": [
            "groupId",
            "parentGroupId"
          ]
        },
        "ResGroupRelationDto": {
          "type": "object",
          "properties": {
            "group": {
              "$ref": "#/components/schemas/ResGroupCourseDto"
            },
            "parentGroup": {
              "$ref": "#/components/schemas/ResGroupCourseDto"
            }
          },
          "required": [
            "group",
            "parentGroup"
          ]
        },
        "ResCourseDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "code": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "credits": {
              "type": "number"
            },
            "groupId": {
              "type": "string"
            },
            "prereqCourseCodes": {
              "type": "array",
              "items": {
                "type": "array"
              }
            }
          },
          "required": [
            "id",
            "code",
            "name",
            "credits",
            "groupId",
            "prereqCourseCodes"
          ]
        },
        "PaginationCourseDto": {
          "type": "object",
          "properties": {
            "meta": {
              "$ref": "#/components/schemas/PaginationMetaDto"
            },
            "links": {
              "$ref": "#/components/schemas/PaginationLinkDto"
            },
            "items": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ResCourseDto"
              }
            }
          },
          "required": [
            "meta",
            "links",
            "items"
          ]
        },
        "ReqCreateCourseDto": {
          "type": "object",
          "properties": {
            "code": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "credits": {
              "type": "number"
            },
            "groupId": {
              "type": "string"
            }
          },
          "required": [
            "code",
            "name",
            "credits",
            "groupId"
          ]
        },
        "ReqUpdateCourseDto": {
          "type": "object",
          "properties": {
            "code": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "credits": {
              "type": "number"
            }
          },
          "required": [
            "code",
            "name",
            "credits"
          ]
        },
        "ReqCreateCourseRelationDto": {
          "type": "object",
          "properties": {
            "courseId": {
              "type": "string"
            },
            "prereqCourseCode": {
              "type": "string"
            }
          },
          "required": [
            "courseId",
            "prereqCourseCode"
          ]
        },
        "ResGradeConversionDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "fromTenPointGrade": {
              "type": "number"
            },
            "toTenPointGrade": {
              "type": "number"
            },
            "labelTenPointGrade": {
              "type": "string"
            },
            "fourPointGrade": {
              "type": "number"
            },
            "letterGrade": {
              "type": "string"
            },
            "conversionTableId": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "fromTenPointGrade",
            "toTenPointGrade",
            "labelTenPointGrade",
            "fourPointGrade",
            "letterGrade",
            "conversionTableId"
          ]
        },
        "ResGradeConversionTableDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "gradeConversions": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ResGradeConversionDto"
              }
            }
          },
          "required": [
            "id",
            "name",
            "gradeConversions"
          ]
        },
        "PaginationConversionTableDto": {
          "type": "object",
          "properties": {
            "meta": {
              "$ref": "#/components/schemas/PaginationMetaDto"
            },
            "links": {
              "$ref": "#/components/schemas/PaginationLinkDto"
            },
            "items": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ResGradeConversionTableDto"
              }
            }
          },
          "required": [
            "meta",
            "links",
            "items"
          ]
        },
        "ReqCreateGradeConversionDto": {
          "type": "object",
          "properties": {
            "fromTenPointGrade": {
              "type": "number"
            },
            "toTenPointGrade": {
              "type": "number"
            },
            "labelTenPointGrade": {
              "type": "string"
            },
            "fourPointGrade": {
              "type": "number"
            },
            "letterGrade": {
              "type": "string"
            }
          },
          "required": [
            "fromTenPointGrade",
            "toTenPointGrade",
            "labelTenPointGrade",
            "fourPointGrade",
            "letterGrade"
          ]
        },
        "ReqCreateGradeConversionTableDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "gradeConversions": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ReqCreateGradeConversionDto"
              }
            }
          },
          "required": [
            "name",
            "gradeConversions"
          ]
        },
        "ReqSignUpDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string"
            },
            "password": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          },
          "required": [
            "email",
            "password",
            "name"
          ]
        },
        "ResMailDto": {
          "type": "object",
          "properties": {
            "from": {
              "type": "string"
            },
            "to": {
              "type": "string"
            }
          },
          "required": [
            "from",
            "to"
          ]
        },
        "ReqVerifyEmailDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string"
            },
            "otp": {
              "type": "string"
            }
          },
          "required": [
            "email",
            "otp"
          ]
        },
        "ResTokenDto": {
          "type": "object",
          "properties": {
            "accessToken": {
              "type": "string"
            },
            "refreshToken": {
              "type": "string"
            }
          },
          "required": [
            "accessToken",
            "refreshToken"
          ]
        },
        "ReqLoginDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string"
            },
            "password": {
              "type": "string",
              "nullable": false
            }
          },
          "required": [
            "email",
            "password"
          ]
        },
        "ReqRefreshTokenDto": {
          "type": "object",
          "properties": {
            "refreshToken": {
              "type": "string"
            }
          },
          "required": [
            "refreshToken"
          ]
        },
        "ReqGoogleTokenDto": {
          "type": "object",
          "properties": {
            "idToken": {
              "type": "string"
            }
          },
          "required": [
            "idToken"
          ]
        },
        "ReqForgotPasswordDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string"
            }
          },
          "required": [
            "email"
          ]
        },
        "ReqResetPasswordDto": {
          "type": "object",
          "properties": {
            "newPassword": {
              "type": "string"
            }
          },
          "required": [
            "newPassword"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
