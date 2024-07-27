window.onload = function () {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
    swaggerDoc: {
      openapi: '3.0.0',
      paths: {
        '/': {
          get: {
            operationId: 'AppController_getHello',
            parameters: [],
            responses: {
              200: {
                description: '',
              },
            },
            tags: ['App'],
          },
        },
        '/api/school': {
          get: {
            operationId: 'SchoolController_getSchools',
            parameters: [
              {
                name: 'order',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  enum: ['ASC', 'DESC'],
                  type: 'string',
                },
              },
              {
                name: 'page',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  type: 'number',
                },
              },
              {
                name: 'limit',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  type: 'number',
                },
              },
              {
                name: 'q',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  type: 'string',
                },
              },
            ],
            responses: {
              200: {
                description: 'Get all schools',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/PaginationSchoolDto',
                    },
                  },
                },
              },
            },
            tags: ['School'],
          },
        },
        '/api/major': {
          get: {
            operationId: 'MajorController_get',
            parameters: [
              {
                name: 'order',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  enum: ['ASC', 'DESC'],
                  type: 'string',
                },
              },
              {
                name: 'page',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  type: 'number',
                },
              },
              {
                name: 'limit',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  type: 'number',
                },
              },
              {
                name: 'q',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  type: 'string',
                },
              },
              {
                name: 'schoolId',
                required: false,
                in: 'query',
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              200: {
                description: 'Get all major',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/PaginationMajorDto',
                    },
                  },
                },
              },
            },
            tags: ['Major'],
          },
        },
        '/api/major/detail/{majorId}': {
          get: {
            operationId: 'MajorController_getDetails',
            parameters: [
              {
                name: 'majorId',
                required: true,
                in: 'path',
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              200: {
                description: 'Get details of a major',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResMajorDetailDto',
                    },
                  },
                },
              },
            },
            tags: ['Major'],
          },
        },
        '/api/group-course': {
          get: {
            operationId: 'GroupCourseController_getGroups',
            parameters: [
              {
                name: 'order',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  enum: ['ASC', 'DESC'],
                  type: 'string',
                },
              },
              {
                name: 'page',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  type: 'number',
                },
              },
              {
                name: 'limit',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  type: 'number',
                },
              },
              {
                name: 'q',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  type: 'string',
                },
              },
              {
                name: 'majorId',
                required: false,
                in: 'query',
                schema: {
                  type: 'string',
                },
              },
              {
                name: 'schoolId',
                required: false,
                in: 'query',
                schema: {
                  type: 'string',
                },
              },
              {
                name: 'type',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  enum: [
                    'ALL_SELECTION',
                    'SINGLE_SELECT',
                    'MULTIPLE_SELECTION',
                  ],
                  type: 'string',
                },
              },
            ],
            responses: {
              200: {
                description: 'Get Group Course',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/PaginationGroupCourseDto',
                    },
                  },
                },
              },
            },
            tags: ['Group Course'],
          },
        },
        '/api/group-course/details/{groupId}': {
          get: {
            operationId: 'GroupCourseController_getGroupCourseDetails',
            parameters: [
              {
                name: 'groupId',
                required: true,
                in: 'path',
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              200: {
                description: 'Get group course details',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResGroupCourseDetailDto',
                    },
                  },
                },
              },
            },
            tags: ['Group Course'],
          },
        },
        '/api/course': {
          get: {
            operationId: 'CourseController_get',
            parameters: [
              {
                name: 'order',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  enum: ['ASC', 'DESC'],
                  type: 'string',
                },
              },
              {
                name: 'page',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  type: 'number',
                },
              },
              {
                name: 'limit',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  type: 'number',
                },
              },
              {
                name: 'q',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  type: 'string',
                },
              },
              {
                name: 'id',
                required: false,
                in: 'query',
                schema: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
              },
              {
                name: 'code',
                required: false,
                in: 'query',
                schema: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
              },
              {
                name: 'name',
                required: false,
                in: 'query',
                schema: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
              },
              {
                name: 'credits',
                required: false,
                in: 'query',
                schema: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
              },
              {
                name: 'groupId',
                required: false,
                in: 'query',
                schema: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
              },
            ],
            responses: {
              200: {
                description: 'Get all courses',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/PaginationCourseDto',
                    },
                  },
                },
              },
            },
            tags: ['Course'],
          },
        },
        '/api/grade-conversion/table': {
          get: {
            operationId: 'GradeConversionController_getGradeConversionTables',
            parameters: [
              {
                name: 'order',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  enum: ['ASC', 'DESC'],
                  type: 'string',
                },
              },
              {
                name: 'page',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  type: 'number',
                },
              },
              {
                name: 'limit',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  type: 'number',
                },
              },
              {
                name: 'q',
                required: false,
                in: 'query',
                schema: {
                  nullable: true,
                  type: 'string',
                },
              },
            ],
            responses: {
              200: {
                description: 'Get all grade conversion tables',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/PaginationConversionTableDto',
                    },
                  },
                },
              },
            },
            tags: ['Grade Conversion'],
          },
        },
        '/api/auth/signup': {
          post: {
            operationId: 'AuthController_signup',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ReqSignUpDto',
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'User sign up.',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResMailDto',
                    },
                  },
                },
              },
            },
            tags: ['Authentication'],
          },
        },
        '/api/auth/verify-signup': {
          post: {
            operationId: 'AuthController_verifySignup',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ReqVerifyEmailDto',
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Verify email when user sign up.',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResTokenDto',
                    },
                  },
                },
              },
            },
            tags: ['Authentication'],
          },
        },
        '/api/auth/login': {
          post: {
            operationId: 'AuthController_login',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ReqLoginDto',
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'User login.',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResTokenDto',
                    },
                  },
                },
              },
            },
            tags: ['Authentication'],
          },
        },
        '/api/auth/refresh-token': {
          post: {
            operationId: 'AuthController_refreshToken',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ReqRefreshTokenDto',
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Refresh token.',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResTokenDto',
                    },
                  },
                },
              },
            },
            tags: ['Authentication'],
          },
        },
        '/api/auth/google': {
          post: {
            operationId: 'AuthController_authGoogle',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ReqGoogleTokenDto',
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Auth google.',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResTokenDto',
                    },
                  },
                },
              },
            },
            tags: ['Authentication'],
          },
        },
        '/api/auth/forgot-password': {
          post: {
            operationId: 'AuthController_forgotPassword',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ReqForgotPasswordDto',
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Forget password.',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResMailDto',
                    },
                  },
                },
              },
            },
            tags: ['Authentication'],
          },
        },
        '/api/auth/reset-password': {
          post: {
            operationId: 'AuthController_resetPassword',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ReqResetPasswordDto',
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Reset password.',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResTokenDto',
                    },
                  },
                },
              },
            },
            tags: ['Authentication'],
          },
        },
        '/api/auth/me': {
          get: {
            operationId: 'AuthController_getMe',
            parameters: [],
            responses: {
              200: {
                description: 'Get me.',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResGetMeDto',
                    },
                  },
                },
              },
            },
            tags: ['Authentication'],
            security: [
              {
                bearer: [],
              },
            ],
          },
        },
        '/api/admin/auth/login': {
          post: {
            operationId: 'AdminAuthController_login',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ReqLoginDto',
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Admin login.',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResTokenDto',
                    },
                  },
                },
              },
            },
            tags: ['Admin Auth'],
          },
        },
        '/api/admin/school': {
          post: {
            operationId: 'AdminSchoolController_create',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ReqCreateSchoolDto',
                  },
                },
              },
            },
            responses: {
              201: {
                description: 'Create a new school',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResSchoolDto',
                    },
                  },
                },
              },
            },
            tags: ['Admin School'],
            security: [
              {
                bearer: [],
              },
            ],
          },
        },
        '/api/admin/school/{schoolId}': {
          put: {
            operationId: 'AdminSchoolController_update',
            parameters: [
              {
                name: 'schoolId',
                required: true,
                in: 'path',
                schema: {
                  type: 'string',
                },
              },
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/reqUpdateSchoolDto',
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Update a school',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResSchoolDto',
                    },
                  },
                },
              },
            },
            tags: ['Admin School'],
            security: [
              {
                bearer: [],
              },
            ],
          },
          delete: {
            operationId: 'AdminSchoolController_delete',
            parameters: [
              {
                name: 'schoolId',
                required: true,
                in: 'path',
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              200: {
                description: 'Delete a school',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResDeleteResultDto',
                    },
                  },
                },
              },
            },
            tags: ['Admin School'],
            security: [
              {
                bearer: [],
              },
            ],
          },
        },
        '/api/admin/major': {
          post: {
            operationId: 'AdminMajorController_create',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ReqCreateMajorDto',
                  },
                },
              },
            },
            responses: {
              201: {
                description: 'Create a new major',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResMajorDto',
                    },
                  },
                },
              },
            },
            tags: ['Admin Major'],
            security: [
              {
                bearer: [],
              },
            ],
          },
        },
        '/api/admin/major/{majorId}': {
          put: {
            operationId: 'AdminMajorController_update',
            parameters: [
              {
                name: 'majorId',
                required: true,
                in: 'path',
                schema: {
                  type: 'string',
                },
              },
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ReqUpdateMajorDto',
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Update a major',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResMajorDto',
                    },
                  },
                },
              },
            },
            tags: ['Admin Major'],
            security: [
              {
                bearer: [],
              },
            ],
          },
          delete: {
            operationId: 'AdminMajorController_delete',
            parameters: [
              {
                name: 'majorId',
                required: true,
                in: 'path',
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              200: {
                description: 'Delete a major',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResDeleteResultDto',
                    },
                  },
                },
              },
            },
            tags: ['Admin Major'],
            security: [
              {
                bearer: [],
              },
            ],
          },
        },
        '/api/admin/group-course/create': {
          post: {
            operationId: 'AdminCourseController_createGroupCourse',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ReqCreateGroupCourseDto',
                  },
                },
              },
            },
            responses: {
              201: {
                description: 'Create a new group course',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResGroupCourseDto',
                    },
                  },
                },
              },
            },
            tags: ['Admin Course'],
            security: [
              {
                bearer: [],
              },
            ],
          },
        },
        '/api/admin/group-course/{groupId}': {
          put: {
            operationId: 'AdminCourseController_updateGroupCourse',
            parameters: [
              {
                name: 'groupId',
                required: true,
                in: 'path',
                schema: {
                  type: 'string',
                },
              },
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ReqUpdateGroupCourseDto',
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Update a group course',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResGroupCourseDto',
                    },
                  },
                },
              },
            },
            tags: ['Admin Course'],
            security: [
              {
                bearer: [],
              },
            ],
          },
          delete: {
            operationId: 'AdminCourseController_deleteGroupCourse',
            parameters: [
              {
                name: 'groupId',
                required: true,
                in: 'path',
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              200: {
                description: 'Delete a group course',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResDeleteResultDto',
                    },
                  },
                },
              },
            },
            tags: ['Admin Course'],
            security: [
              {
                bearer: [],
              },
            ],
          },
        },
        '/api/admin/group-course/relation': {
          post: {
            operationId: 'AdminCourseController_addRelationGroupCourse',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ReqCreateGroupRelationDto',
                  },
                },
              },
            },
            responses: {
              201: {
                description: 'Create a new group relation',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResGroupRelationDto',
                    },
                  },
                },
              },
            },
            tags: ['Admin Course'],
            security: [
              {
                bearer: [],
              },
            ],
          },
        },
        '/api/admin/course/create': {
          post: {
            operationId: 'AdminCourseController_createCourse',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ReqCreateCourseDto',
                  },
                },
              },
            },
            responses: {
              201: {
                description: 'Create a new course',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResCourseDto',
                    },
                  },
                },
              },
            },
            tags: ['Admin Course'],
            security: [
              {
                bearer: [],
              },
            ],
          },
        },
        '/api/admin/course/{courseId}': {
          put: {
            operationId: 'AdminCourseController_updateCourse',
            parameters: [
              {
                name: 'courseId',
                required: true,
                in: 'path',
                schema: {
                  type: 'string',
                },
              },
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ReqUpdateCourseDto',
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Update a course',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResCourseDto',
                    },
                  },
                },
              },
            },
            tags: ['Admin Course'],
            security: [
              {
                bearer: [],
              },
            ],
          },
          delete: {
            operationId: 'AdminCourseController_deleteCourse',
            parameters: [
              {
                name: 'courseId',
                required: true,
                in: 'path',
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              200: {
                description: 'Delete a course',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResDeleteResultDto',
                    },
                  },
                },
              },
            },
            tags: ['Admin Course'],
            security: [
              {
                bearer: [],
              },
            ],
          },
        },
        '/api/admin/course/{courseId}/relation': {
          post: {
            operationId: 'AdminCourseController_addPrereqCourse',
            parameters: [
              {
                name: 'courseId',
                required: true,
                in: 'path',
                schema: {
                  type: 'string',
                },
              },
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ReqCreateCourseRelationDto',
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Add a prereq course',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ResCourseDto',
                    },
                  },
                },
              },
            },
            tags: ['Admin Course'],
            security: [
              {
                bearer: [],
              },
            ],
          },
        },
      },
      info: {
        title: 'API Documentation',
        description: 'API description',
        version: '1.0',
        contact: {},
      },
      tags: [],
      servers: [],
      components: {
        securitySchemes: {
          bearer: {
            scheme: 'bearer',
            bearerFormat: 'JWT',
            type: 'http',
          },
        },
        schemas: {
          PaginationMetaDto: {
            type: 'object',
            properties: {
              itemCount: {
                type: 'number',
              },
              totalItems: {
                type: 'number',
              },
              itemsPerPage: {
                type: 'number',
              },
              totalPages: {
                type: 'number',
              },
              currentPage: {
                type: 'number',
              },
            },
            required: [
              'itemCount',
              'totalItems',
              'itemsPerPage',
              'totalPages',
              'currentPage',
            ],
          },
          PaginationLinkDto: {
            type: 'object',
            properties: {
              first: {
                type: 'string',
              },
              previous: {
                type: 'string',
              },
              next: {
                type: 'string',
              },
              last: {
                type: 'string',
              },
            },
            required: ['first', 'previous', 'next', 'last'],
          },
          ResSchoolDto: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
            },
            required: ['id', 'name'],
          },
          PaginationSchoolDto: {
            type: 'object',
            properties: {
              meta: {
                $ref: '#/components/schemas/PaginationMetaDto',
              },
              links: {
                $ref: '#/components/schemas/PaginationLinkDto',
              },
              items: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/ResSchoolDto',
                },
              },
            },
            required: ['meta', 'links', 'items'],
          },
          ResMajorDto: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              schoolId: {
                type: 'string',
              },
            },
            required: ['id', 'name', 'schoolId'],
          },
          PaginationMajorDto: {
            type: 'object',
            properties: {
              meta: {
                $ref: '#/components/schemas/PaginationMetaDto',
              },
              links: {
                $ref: '#/components/schemas/PaginationLinkDto',
              },
              items: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/ResMajorDto',
                },
              },
            },
            required: ['meta', 'links', 'items'],
          },
          ResGroupCourseDetailDto: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              type: {
                type: 'string',
              },
              minCredits: {
                type: 'number',
              },
              minCourses: {
                type: 'number',
              },
              minGroups: {
                type: 'number',
              },
              majorId: {
                type: 'string',
              },
              title: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              children: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/ResGroupCourseDetailDto',
                },
              },
            },
            required: [
              'id',
              'type',
              'minCredits',
              'minCourses',
              'minGroups',
              'majorId',
              'title',
              'description',
              'children',
            ],
          },
          ResMajorDetailDto: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              schoolId: {
                type: 'string',
              },
              groupCourses: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/ResGroupCourseDetailDto',
                },
              },
            },
            required: ['id', 'name', 'schoolId', 'groupCourses'],
          },
          ResGroupCourseDto: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              type: {
                type: 'string',
              },
              minCredits: {
                type: 'number',
              },
              minCourses: {
                type: 'number',
              },
              minGroups: {
                type: 'number',
              },
              majorId: {
                type: 'string',
              },
              title: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
            },
            required: [
              'id',
              'type',
              'minCredits',
              'minCourses',
              'minGroups',
              'majorId',
              'title',
              'description',
            ],
          },
          PaginationGroupCourseDto: {
            type: 'object',
            properties: {
              meta: {
                $ref: '#/components/schemas/PaginationMetaDto',
              },
              links: {
                $ref: '#/components/schemas/PaginationLinkDto',
              },
              items: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/ResGroupCourseDto',
                },
              },
            },
            required: ['meta', 'links', 'items'],
          },
          ResCourseDto: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              code: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              credits: {
                type: 'number',
              },
              groupId: {
                type: 'string',
              },
              prereqCourseCodes: {
                type: 'array',
                items: {
                  type: 'array',
                },
              },
            },
            required: [
              'id',
              'code',
              'name',
              'credits',
              'groupId',
              'prereqCourseCodes',
            ],
          },
          PaginationCourseDto: {
            type: 'object',
            properties: {
              meta: {
                $ref: '#/components/schemas/PaginationMetaDto',
              },
              links: {
                $ref: '#/components/schemas/PaginationLinkDto',
              },
              items: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/ResCourseDto',
                },
              },
            },
            required: ['meta', 'links', 'items'],
          },
          ResGradeConversionDto: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              fromTenPointGrade: {
                type: 'number',
              },
              toTenPointGrade: {
                type: 'number',
              },
              labelTenPointGrade: {
                type: 'string',
              },
              fourPointGrade: {
                type: 'number',
              },
              letterGrade: {
                type: 'string',
              },
              conversionTableId: {
                type: 'string',
              },
            },
            required: [
              'id',
              'fromTenPointGrade',
              'toTenPointGrade',
              'labelTenPointGrade',
              'fourPointGrade',
              'letterGrade',
              'conversionTableId',
            ],
          },
          ResGradeConversionTableDto: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              gradeConversions: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/ResGradeConversionDto',
                },
              },
            },
            required: ['id', 'name', 'gradeConversions'],
          },
          PaginationConversionTableDto: {
            type: 'object',
            properties: {
              meta: {
                $ref: '#/components/schemas/PaginationMetaDto',
              },
              links: {
                $ref: '#/components/schemas/PaginationLinkDto',
              },
              items: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/ResGradeConversionTableDto',
                },
              },
            },
            required: ['meta', 'links', 'items'],
          },
          ReqSignUpDto: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
              },
              password: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
            },
            required: ['email', 'password', 'name'],
          },
          ResMailDto: {
            type: 'object',
            properties: {
              from: {
                type: 'string',
              },
              to: {
                type: 'string',
              },
            },
            required: ['from', 'to'],
          },
          ReqVerifyEmailDto: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
              },
            },
            required: ['token'],
          },
          ResTokenDto: {
            type: 'object',
            properties: {
              accessToken: {
                type: 'string',
              },
              refreshToken: {
                type: 'string',
              },
            },
            required: ['accessToken', 'refreshToken'],
          },
          ReqLoginDto: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
              },
              password: {
                type: 'string',
                nullable: false,
              },
            },
            required: ['email', 'password'],
          },
          ReqRefreshTokenDto: {
            type: 'object',
            properties: {
              refreshToken: {
                type: 'string',
              },
            },
            required: ['refreshToken'],
          },
          ReqGoogleTokenDto: {
            type: 'object',
            properties: {
              googleAccessToken: {
                type: 'string',
              },
            },
            required: ['googleAccessToken'],
          },
          ReqForgotPasswordDto: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
              },
            },
            required: ['email'],
          },
          ReqResetPasswordDto: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
              },
              newPassword: {
                type: 'string',
              },
            },
            required: ['token', 'newPassword'],
          },
          ResGetMeDto: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              email: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              role: {
                type: 'string',
              },
              avatar: {
                type: 'string',
              },
            },
            required: ['id', 'email', 'name', 'role', 'avatar'],
          },
          ReqCreateSchoolDto: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
            required: ['name'],
          },
          reqUpdateSchoolDto: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
            required: ['name'],
          },
          ResDeleteResultDto: {
            type: 'object',
            properties: {
              raw: {
                type: 'object',
              },
              affected: {
                type: 'number',
              },
            },
            required: ['raw', 'affected'],
          },
          ReqCreateMajorDto: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              schoolId: {
                type: 'string',
              },
            },
            required: ['name', 'schoolId'],
          },
          ReqUpdateMajorDto: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
            required: ['name'],
          },
          ReqCreateGroupCourseDto: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['ALL_SELECTION', 'SINGLE_SELECT', 'MULTIPLE_SELECTION'],
              },
              minCredits: {
                type: 'number',
                nullable: true,
              },
              minCourses: {
                type: 'number',
                nullable: true,
              },
              minGroups: {
                type: 'number',
                nullable: true,
              },
              majorId: {
                type: 'string',
              },
              title: {
                type: 'string',
                nullable: true,
              },
              description: {
                type: 'string',
                nullable: true,
              },
              parentGroupId: {
                type: 'string',
                nullable: true,
                example: 'null | string',
              },
            },
            required: [
              'type',
              'minCredits',
              'minCourses',
              'minGroups',
              'majorId',
              'title',
              'description',
            ],
          },
          ReqUpdateGroupCourseDto: {
            type: 'object',
            properties: {
              minCredits: {
                type: 'number',
                nullable: true,
                minimum: 0,
              },
              minCourses: {
                type: 'number',
                nullable: true,
                minimum: 0,
              },
              minGroups: {
                type: 'number',
                nullable: true,
                minimum: 0,
              },
              title: {
                type: 'string',
                nullable: true,
              },
              description: {
                type: 'string',
                nullable: true,
              },
            },
            required: [
              'minCredits',
              'minCourses',
              'minGroups',
              'title',
              'description',
            ],
          },
          ReqCreateGroupRelationDto: {
            type: 'object',
            properties: {
              groupId: {
                type: 'string',
              },
              parentGroupId: {
                type: 'string',
              },
            },
            required: ['groupId', 'parentGroupId'],
          },
          ResGroupRelationDto: {
            type: 'object',
            properties: {
              group: {
                $ref: '#/components/schemas/ResGroupCourseDto',
              },
              parentGroup: {
                $ref: '#/components/schemas/ResGroupCourseDto',
              },
            },
            required: ['group', 'parentGroup'],
          },
          ReqCreateCourseDto: {
            type: 'object',
            properties: {
              code: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              credits: {
                type: 'number',
              },
              groupId: {
                type: 'string',
              },
            },
            required: ['code', 'name', 'credits', 'groupId'],
          },
          ReqUpdateCourseDto: {
            type: 'object',
            properties: {
              code: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              credits: {
                type: 'number',
              },
            },
            required: ['code', 'name', 'credits'],
          },
          ReqCreateCourseRelationDto: {
            type: 'object',
            properties: {
              courseId: {
                type: 'string',
              },
              prereqCourseCode: {
                type: 'string',
              },
            },
            required: ['courseId', 'prereqCourseCode'],
          },
        },
      },
    },
    customOptions: {},
  };
  url = options.swaggerUrl || url;
  let urls = options.swaggerUrls;
  let customOptions = options.customOptions;
  let spec1 = options.swaggerDoc;
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    plugins: [SwaggerUIBundle.plugins.DownloadUrl],
    layout: 'StandaloneLayout',
  };
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions);

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth);
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction);
  }

  window.ui = ui;
};
