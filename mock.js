import Mock from 'mockjs'
Mock.mock('/api/statistics/info', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'pass': 24,
    'people': 7,
    'project': 21,
    'lesson': 66
  }
})
Mock.mock('/api/message/stat', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'approval': 24,
    'project': 21,
    'lesson': 66
  }
})
Mock.mock('/api/user/login', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'name': 'jinshuai',
    'company': '',
    'phone': '',
    'email': ''
  }
})
Mock.mock('/api/user/session', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'name': 'jinshuai',
    'company': '',
    'phone': '',
    'email': ''
  }
})
Mock.mock('/api/user/loginOut', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': ''
})

Mock.mock('/api/user/register', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': ''
})
Mock.mock('/api/user/forgotPassword', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '您输入的用户名和邮箱不存在，请核对后输入！'
})
Mock.mock('/api/user/passwd', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': ''
})
Mock.mock('/api/user/resetPwd', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': ''
})

Mock.mock('/api/lesson/list', {
  'code': '1', // 这个定义数据的模板形式下面会介绍
  'message': '',
  'data': {
    'total': 33,
    'list|20': [
      {
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
Mock.mock('api/question/list?bank_id=&type=&keyword=', {
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
Mock.mock('/api/examinationPaper/list?type=%E6%89%8B%E5%8A%A8%E5%87%BA%E9%A2%98&limit=10&offset=1&keyword=', {
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
