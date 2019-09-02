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
    'account': 'jinshuai',
    'company': '',
    'phone': '',
    'email': ''
  }
})
Mock.mock('/v1/user/session', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'account': 'jinshuai',
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

Mock.mock('v1/lesson/list?keyword=&tag_id[]=0&tag_id[]=0&tag_id[]=0&offset=1&limit=20', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'total': 33,
    'list|10': [
      {
        'id|1-100': 3,
        // 'id': 3,
        'name': '入职课程',
        'cover': 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        'minute|1-120': 20,
        'credit|1-120': 10,
        'obj': '实习生',
        'target': '目标',
        'tags': [4, 5, 6],
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
        'status|1': [0, 1, 2], // 状态0下线1上线2草稿
        'learn_num': 119,
        'add_time': '2019.6.14'
      }
    ]
  }
})
Mock.mock('/v1/question/list?keyword=&type=all&bank_id=6&offset=1&limit=10', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'total': 33,
    'list|33': [
      {
        'id|1-100': 3,
        'bank_id': 6,
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
// Mock.mock('/v1/examinationPaper/list?keyword=&offset=1&limit=10', {
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
Mock.mock('v1/lesson/add', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': ''
})

Mock.mock('/v1/lesson/cover', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': [
    'http://frogo.cn:7005/cover/cover-1.png',
    'http://frogo.cn:7005/cover/cover-2.png',
    'http://frogo.cn:7005/cover/cover-3.png',
    'http://frogo.cn:7005/cover/cover-4.png',
    'http://frogo.cn:7005/cover/cover-5.png',
    'http://frogo.cn:7005/cover/cover-6.png',
    'http://frogo.cn:7005/cover/cover-7.png'
  ]
})

Mock.mock('v1/lessonDraft/add', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '保存成功'
})
Mock.mock('/v1/lesson/delete', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '课程删除成功'
})
Mock.mock('/v1/lesson/Online', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '课程上线/下线成功'
})
Mock.mock('v1/tag/delete', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '标签删除成功'
})
Mock.mock('v1/tag/add', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '标签新增成功'
})
Mock.mock('v1/tag/list', {
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
            'name|1': ['新员工', '老员工'],
            'readonly': 1,
            'parent_id': 1,
            'child': null
          },
          {
            'id': 5,
            'company_id': 0,
            'name|1': ['一般员工', '管理层'],
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
    'series': [],
    'status': [
      {
        'value': 1,
        'name': '已发布'
      },
      {
        'value': 2,
        'name': '已下线'
      },
      {
        'value': 3,
        'name': '草稿'
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
Mock.mock('v1/lesson/getLessonTags?lesson_id=117', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': [{
    'active': true,
    'child': null,
    'company_id': 1,
    'id': 16,
    'name': '小组长',
    'parent_id': 1,
    'readonly': 0
  }
  ]
})

Mock.mock('v1/statistics/getCampCreditRank', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'list|5': [
      {
        'student_name': '张昂',
        'lesson_count': 4,
        'credit|1-10': 0
      }
    ],
    'total': 10
  }
})

Mock.mock('/v1/lesson/info?id=6', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'id': '3',
    'name': '入职课程',
    'cover': 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    'minute|1-180': 180,
    'credit|1-120': 60,
    'obj': '实习生',
    'target': '目标',
    'tags': [4, 5, 6],
    'introduction': '介绍',
    'syllabus': '大纲',
    'teacher_info': {
      'name': '王铮',
      'pic': 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      'introduction': '简介内容'
    },
    'examination_info': {
      'id': 1,
      'name': '试卷名称',
      'num': 20,
      'rule': '手动出题',
      'add_time': '2019.6.13'
    },
    'attachment': {
      'url': '/att/2898247/file.doc',
      'name': '附件名称'
    },
    'status': '0',
    'add_time': '2019.6.14'
  }
})

Mock.mock('v1/project/list?keyword=&status=all&offset=1&limit=8', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'total': 31,
    'list|8': [
      {
        'id': 2,
        'name|1': ['孙子兵法实践初级入门第一届1', '孙子兵法实践初级入门第一届2', '孙子兵法实践初级入门第一届3', '孙子兵法实践初级入门第一届4', '孙子兵法实践初级入门第一届5'],
        'start_time': '2019-02-21',
        'end_time': '2019-09-21',
        'introduction': '十四次撒擦色威威v菜市场但是速度测试',
        'obj': '企业家老板',
        'target_num': 12,
        'lesson_info|3': [
          {
            'id': 3,
            'name': '第一门课',
            'teacher': '孙子',
            'minute': '40',
            'credit': '90'
          }
        ],
        'is_review|1': [0, 1],
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
        'ratio|1-100': 50,
        'status|1': [0, 1, 2],
        'add_time': '2019-09-21'
      }
    ]
  }
})

Mock.mock('/v1/statistics/getCampOneStudentLesson?camp_id=2&student_id=1&offset=1&limit=10', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'total': 31,
    'list|8': [
      {
        'lesson_id|1-100': 2,
        'lesson_name': '第四课-薪酬福利',
        'score|1-100': 0, // 考试（分）
        'reset_score|1-100': 0, // 重考（分）
        'credit|1-100': 0, // 学分
        'finish_time': 0,
        'status': 0
      }
    ]
  }
})

Mock.mock('/v1/statistics/getCampStudent?camp_id=2&offset=1&limit=10', { // 项目的参训学员信息，因为需要分页，不和项目详情一起返回，单独一个接口
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'total': 31,
    'list|8': [
      {
        'student_name': '张昂',
        'student_phone': '13277097289',
        'camp_id': 6,
        'student_id': 1,
        'add_time': '2019-01-21',
        'sign': 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        'finish_time': '2019-01-21',
        'credit': 120,
        'number': '1324',
        'department': '销售'
      }
    ]
  }
})

Mock.mock('/v1/statistics/getCampStudentLesson?camp_id=2&offset=1&limit=10', { // todo 项目的信息
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'total': 31,
    'list|8': [
      {
        'student_name': '张昂',
        'student_phone': '13277097289',
        'student_status': '正常',
        'lesson_name': '课程名称',
        'lesson_source': '课程来源',
        'lesson_status': '课程状态',
        'minute': 100, // 学习时长
        'completion_percent': 87, // 完成度
        'start_time': '2019-01-21',
        'finish_time': '2019-01-21',
        'score': 0, // 考试成绩
        'reset_score': 0, // 补考成绩
        'credit': 120,
        'number': '1324', // 编号
        'department': '销售' // 部门
      }
    ]
  }
})
Mock.mock('/v1/project/info?id=2', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'id': '2',
    'name': '项目名称',
    'start_time': '2008.12.30',
    'end_time': '2009.12.50',
    'introduction': '士大夫撒旦发生隔热隔热哥哥人格人格人格',
    'obj': '一般员工',
    'target_num': 20,
    'join_num': 78,
    'complete_num': 23,
    'lesson_info|3': [
      {
        'id|1-100': 1,
        'name|1': ['课程名称1', '课程名称2', '课程名称3', '课程名称4'],
        'teacher': '教师姓名',
        'minute': 22,
        'credit': 100
      }
    ],
    'is_review': '是否需要审批',
    'is_auth': '是否需要认证',
    'is_pwd': '是否需要口令',
    'is_sign': '是否需要签到',
    'passwd': '口令',
    'personnel': [
      {
        'id': 5,
        'name': '学员姓名'
      }
    ],
    'status|1': ['0', '1', '2'], // '状态0下线 1上线 2草稿',
    'add_time': '2009-12-23'
  }
})

Mock.mock('/v1/statistics/getCampJoinChart', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': [
    {
      'month': 8,
      'join_num': 78,
      'finish_num': 30
    },
    {
      'month': 9,
      'join_num': 46,
      'finish_num': 21
    },
    {
      'month': 11,
      'join_num': 65,
      'finish_num': 30
    }
  ]
})
Mock.mock('/v1/project/delete', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '删除成功'
})
Mock.mock('v1/project/online', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '该项目已成功下线'
})
Mock.mock('/v1/projectApproval/list?id=2&offset=1&limit=10', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'total': 31,
    'list|8': [
      {
        'id|1-100': 2,
        'name|1': ['小五', '小四', '小三', '小二', '小额', '小2', '小方法'],
        'phone': '13800000000',
        'add_time': '2019-08-10'
      }
    ]
  }
})

Mock.mock('v1/questionBank/list?keyword=&offset=1&limit=10', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'total': 31,
    'list|10': [
      {
        'id': 6,
        'name|1': ['1孙子兵法实践初级入门第一届', '2孙子兵法实践初级入门第一届', '3孙子兵法实践初级入门第一届', '4孙子兵法实践初级入门第一届', '5孙子兵法实践初级入门第一届', '6孙子兵法实践初级入门第一届', '7孙子兵法实践初级入门第一届', '8孙子兵法实践初级入门第一届', '9孙子兵法实践初级入门第一届', '10孙子兵法实践初级入门第一届'],
        'add_time': '2019-02-21',
        'num|10-100': 12,
        'single_total': 20,
        'multi_total': 12,
        'trueFalse_total': 10
      }
    ]
  }
})
Mock.mock('v1/questionBank/add', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'id': 1
})
Mock.mock('/v1/questionBank/delete', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': ''
})
Mock.mock('/v1/question/list', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'total': 21,
    'list|10': [{
      'id|1-10': 1,
      'bank_id|1-100': 1,
      'type': '单选single',
      'creator': '杨帆',
      'subject|1': ['题目1', '题目2', '题目3', '题目4', '题目5', '题目6', '题目7', '题目8', '题目9', '题目10'],
      'options': [
        {
          'number': '编号',
          'content': '内容',
          'istrue': '是否是正确答案 0否 1是'
        }
      ],
      'add_time': '创建时间'
    }]
  }

})
Mock.mock('/v1/spStudent/list?keyword=&offset=1&limit=10', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'total': 14,
    'list|8': [{
      'id|1-10': 5,
      'name|1': ['小强', '王五', '张三', '李四', '王二麻子'],
      'number': '321dcdc',
      'department|1': ['部门1', '部门2', '部门3', '部门4', '部门5'],
      'pwd': '334',
      'account': 'xiaoqaing'
    }]
  }

})

Mock.mock('/v1/examinationPaper/info', {
  'code': '1',
  'message': '说明',
  'data': {
    'id|1-100': 1,
    'name': '试卷名称',
    'ratio|1-100': 1,
    'minute|1-120': 1,
    'is_question_random': false,
    'is_option_random': false,
    'is_show_answer': false,
    // 'rule|1': ['manual', 'random'],
    'rule': 'manual',
    'question': [{ 'id': 1, 'subject': '试题1' }, { 'id': 2, 'subject': '试题2' }, { 'id': 3, 'subject': '试题3' }, { 'id': 4, 'subject': '试题4' }],
    'question_bank': [
      {
        'id|1-10': 1,
        'single|1-20': 2,
        'multi|1-30': 3,
        'trueFalse|1-40': 4,
        'single_total': 20,
        'multiple_total': 30,
        'trueFalse_total': 40,
        'name': '题库1'
      }
    ],
    'add_time': '2001-02-19'
  }
})
Mock.mock('/v1/question/info', {
  'code': '1',
  'message': '成功',
  'data': {
    'id|1-100': 1,
    'bank_id': 1,
    'type': 'multi',
    'subject': '题目',
    'options': [
      {
        'number': 'A',
        'content': '内容',
        'istrue': 1
      },
      {
        'number': 'B',
        'content': '内容B',
        'istrue': 1
      },
      {
        'number': 'C',
        'content': '内容C',
        'istrue': 1
      },
      {
        'number': 'D',
        'content': '内容D',
        'istrue': 0
      }
    ],
    'add_time': '2009-08-17'
  } })
