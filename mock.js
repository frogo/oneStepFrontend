import Mock from 'mockjs'
Mock.mock('/v1/statistics/info', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'pass': 24,
    'people': 7,
    'project': 21,
    'lesson': 66
  }
})
Mock.mock('/v1/message/stat', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'approval': 24,
    'project': 21,
    'lesson': 66
  }
})
Mock.mock('/v1/user/login', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'name': 'jinshuai',
    'company': '',
    'phone': '',
    'email': ''
  }
})
Mock.mock('/v1/user/session', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'name': 'jinshuai',
    'company': '',
    'phone': '',
    'email': ''
  }
})
Mock.mock('/v1/user/loginOut', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': ''
})

Mock.mock('/v1/user/register', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': ''
})
Mock.mock('/v1/user/forgotPassword', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '您输入的用户名和邮箱不存在，请核对后输入！'
})
Mock.mock('/v1/user/passwd', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': ''
})
Mock.mock('/v1/user/resetPwd', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': ''
})

Mock.mock('/v1/lesson/list', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'total': 33,
    'list|20': [
      {
        'id': '3',
        'name': '入职课程',
        'cover': 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        'minutes': '180',
        'credit': '10',
        'obj': '实习生',
        'target': '目标',
        'syllabus': '大纲',
        'teacher_info': {
          'name': '王铮',
          'pic': '/pic/cover/1.jpg',
          'introduction': '简介内容'
        },
        'examination_info': {
          'id': '1',
          'name': '试卷名称',
          'num': '20',
          'rule': '手动出题',
          'add_time': '2019.6.13'
        },
        'attachment': {
          'url': '/att/2898247/file.doc',
          'name': '附加名称'
        },
        'status': '0',
        'add_time': '2019.6.14'
      }
      // {
      //   'name': '入职课程2',
      //   'cover': '/pic/cover/1.jpg',
      //   'minutes': '180',
      //   'credit': '10',
      //   'obj': '实习生',
      //   'target': '目标',
      //   'syllabus': '大纲',
      //   'teacher_info': {
      //     'name': '王铮',
      //     'pic': '/pic/cover/1.jpg',
      //     'introduction': '简介内容'
      //   },
      //   'examination_info': {
      //     'id': '1',
      //     'name': '试卷名称',
      //     'num': '20',
      //     'rule': '手动出题',
      //     'add_time': '2019.6.13'
      //   },
      //   'attachment': {
      //     'url': '/att/2898247/file.doc',
      //     'name': '附加名称'
      //   },
      //   'status': '2',
      //   'add_time': '2019.6.14'
      // },
      // {
      //   'name': '入职课程3',
      //   'cover': '/pic/cover/1.jpg',
      //   'minutes': '180',
      //   'credit': '10',
      //   'obj': '实习生',
      //   'target': '目标',
      //   'syllabus': '大纲',
      //   'teacher_info': {
      //     'name': '王铮',
      //     'pic': '/pic/cover/1.jpg',
      //     'introduction': '简介内容'
      //   },
      //   'examination_info': {
      //     'id': '1',
      //     'name': '试卷名称',
      //     'num': '20',
      //     'rule': '手动出题',
      //     'add_time': '2019.6.13'
      //   },
      //   'attachment': {
      //     'url': '/att/2898247/file.doc',
      //     'name': '附加名称'
      //   },
      //   'status': '1',
      //   'add_time': '2019.6.14'
      // }

    ]
  }
})
Mock.mock('v1/question/list?bank_id=&type=&keyword=', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'total': 33,
    'list|33': [
      {
        'id': '3',
        'bank_id': '24',
        'type': 'single',
        'subject': 'C#中的类与静态类',
        'options': {
          'number': '2345',
          'content': '吃大餐商店出售的测试测试测试',
          'istrue': '0'
        },
        'add_time': '2019.6.14'
      }
    ]
  }
})
Mock.mock('/v1/examinationPaper/list?type=%E6%89%8B%E5%8A%A8%E5%87%BA%E9%A2%98&limit=10&offset=1&keyword=', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'total': 33,
    'list|10': [
      {
        'id': '3',
        'name': '创建对象中的类与子类',
        'num': '24',
        'rule': '手动出题',
        'addtime': '2019.6.14'
      }
    ] }
})
Mock.mock('/v1/lesson/add', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': ''
})
Mock.mock('/v1/lessonDraft/add', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': ''
})

Mock.mock('/v1/tag/list', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'tag': [
      {
        'id': 1,
        'company_id': 0,
        'name': '层级',
        'readonly': 1,
        'parent_id': 0,
        'child': [
          {
            'id': 4,
            'company_id': 0,
            'name': '新员工',
            'readonly': 1,
            'parent_id': 1,
            'child': null
          },
          {
            'id': 5,
            'company_id': 0,
            'name': '一般员工',
            'readonly': 1,
            'parent_id': 1,
            'child': null
          }
        ]
      },
      {
        'id': 2,
        'company_id': 0,
        'name': '职能',
        'readonly': 1,
        'parent_id': 0,
        'child': [
          {
            'id': 6,
            'company_id': 0,
            'name': '销售部',
            'readonly': 1,
            'parent_id': 2,
            'child': null
          }
        ]
      },
      {
        'id': 3,
        'company_id': 0,
        'name': '自定',
        'readonly': 1,
        'parent_id': 0,
        'child': [
          {
            'id': 7,
            'company_id': 0,
            'name': '战略',
            'readonly': 1,
            'parent_id': 3,
            'child': null
          },
          {
            'id': 8,
            'company_id': 0,
            'name': '内部',
            'readonly': 1,
            'parent_id': 3,
            'child': null
          }
        ]
      }
    ],
    'status': [
      {
        'value': 4,
        'name': '下载'
      },
      {
        'value': 1,
        'name': '正常'
      },
      {
        'value': 2,
        'name': '草稿'
      },
      {
        'value': 3,
        'name': '在线'
      }
    ],
    'source': [
      {
        'value': 1,
        'name': '外部'
      },
      {
        'value': 2,
        'name': '内部'
      }
    ]
  }
})

Mock.mock('/v1/lesson/info?id=3', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'id': '3',
    'name': '入职课程',
    'cover': 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    'minutes': '180',
    'credit': '10',
    'obj': '实习生',
    'target': '目标',
    'introduction': '介绍',
    'syllabus': '大纲',
    'teacher_info': {
      'name': '王铮',
      'pic': 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      'introduction': '简介内容'
    },
    'examination_info': {
      'id': '1',
      'name': '试卷名称',
      'num': '20',
      'rule': '手动出题',
      'add_time': '2019.6.13'
    },
    'attachment': {
      'url': '/att/2898247/file.doc',
      'name': '附加名称'
    },
    'status': '0',
    'add_time': '2019.6.14'
  }
})

Mock.mock('/v1/project/list', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'total': 31,
    'list|10': [
      {
        'id': 1,
        'name': '孙子兵法实践初级入门第一届',
        'start_time': '2019-02-21',
        'end_time': '2019-09-21',
        'introduction': '十四次撒擦色威威v菜市场但是速度测试',
        'obj': '企业家老板',
        'target_num': 12,
        'lesson_info': [
          {
            'id': 3,
            'name': '第一门课',
            'teacher': '孙子',
            'minute': '40',
            'credit': '90'
          }
        ],
        'is_review': 0,
        'is_auth': 0,
        'is_pwd': 0,
        'is_sign': 0,
        'passwd': 'S23EDC',
        'personnel': [
          {
            'id': 1,
            'name': '王五'
          }
        ],
        'ratio': 50,
        'status': 1,
        'add_time': '2019-09-21'
      }
    ]
  }
})

Mock.mock('/v1/questionBank/list?keyword=&offset=1&limit=10', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'total': 31,
    'list|10': [
      {
        'id': 1,
        'name': '孙子兵法实践初级入门第一届',
        'add_time': '2019-02-21',
        'num': 12
      }
    ]
  }
})
Mock.mock('/v1/questionBank/add', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'id': 1
})
Mock.mock('/v1/questionBank/delete', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': ''
})
