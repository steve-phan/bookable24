export interface ILocation {
  // {
  //     "pathname": "/de/login",
  //     "search": "",
  //     "hash": "",
  //     "href": "http://localhost:8888/de/login",
  //     "origin": "http://localhost:8888",
  //     "protocol": "http:",
  //     "host": "localhost:8888",
  //     "hostname": "localhost",
  //     "port": "8888",
  //     "state": {
  //         "key": "1644771107171"
  //     },
  //     "key": "1644771107171"
  // }
  pathname: string
  href: string
  hostname: string
}
