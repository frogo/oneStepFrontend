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

// 协同 （2.3.1.25)  统计查询电子卷宗流转
Mock.mock('/test_xt/', function (options) {
  if (JSON.parse(options.body).orgCode && JSON.parse(options.body).orgCode !== '100') {
    return Mock.mock(
      {
        'errorCode': '1',
        'errorContent': null,
        'datas': [
          {
            'orgCode': '20190528135841010012',
            'orgName': '深圳市公安局',
            'sendAmount': '0',
            'hasChildren': true,
            'sendErrorAmount': '0',
            'sendEvidenceAmount': '0',
            'sendDataAmount': '0M',
            'sendAverageTime': '0秒',
            'recvAmount': '0',
            'recvErrorAmount': '0',
            'recvEvidenceAmount': '0',
            'recvDataAmount': '0M',
            'recvAverageTime': '0秒'
          }]
      })
  } else if (JSON.parse(options.body).orgCode && JSON.parse(options.body).orgCode === '100') {
    return Mock.mock(
      {
        'errorCode': '1',
        'errorContent': null,
        'datas|1': [
          {
            'orgCode': '111100',
            'orgName|1': ['公安', '法院', '检察院', '司法局'],
            'sendAmount': '56789',
            'hasChildren|1': ['true', 'false'],
            'sendErrorAmount': '56789',
            'sendEvidenceAmount': '56789',
            'sendDataAmount': '10GB',
            'sendAverageTime': '2分20秒',
            'recvAmount': '56789',
            'recvErrorAmount': '56789',
            'recvEvidenceAmount': '56789',
            'recvDataAmount': '1TB',
            'recvAverageTime': '2分20秒'
          }]
      })
  } else {
    return Mock.mock(
      {
        'errorCode': '1',
        'errorContent': null,
        'datas|3': [
          {
            'orgCode|101-200': 200,
            'orgName|1': ['公安', '法院', '检察院', '司法局'],
            'hasChildren': 'true',
            'sendAmount': '56789',
            'sendErrorAmount': '56789',
            'sendEvidenceAmount': '56789',
            'sendDataAmount': '10GB',
            'sendAverageTime': '2分20秒',
            'recvAmount': '56789',
            'recvErrorAmount': '56789',
            'recvEvidenceAmount': '56789',
            'recvDataAmount': '1TB',
            'recvAverageTime': '2分20秒'
          }]
      })
  }
})
