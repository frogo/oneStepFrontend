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
Mock.mock('api/user/session', {
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
