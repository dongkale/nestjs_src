import { Controller, Get, Param } from '@nestjs/common';
import { RxjsTestService } from './rxjs-test.service';

import { EventSubscribeHandler } from '../event-subscribe/event-subscribe-handler';
import { EventSubscriber } from '../event-subscribe/event-subscriber';
import { interval } from 'rxjs';

var path = require('path');
var PROJECT_ROOT = path.join(__dirname, '..');

@Controller('rxjs-test')
export class RxjsTestController {
  constructor(
    private readonly service: RxjsTestService,
    private readonly eventSubscribeHandler: EventSubscribeHandler,
    private readonly eventSubscriber: EventSubscriber,
  ) {
    // const data = { name: 'none', number: 0 };
    // service.addedSubscribe('event1', (arg) => {
    //   console.log('event1 수신 : ', arg);
    // });
    // service.addedSubscribe('event2', (arg) => {
    //   console.log('event2 수신 : ', arg);
    // });
    // service.addedSubscribe('event3', (arg) => {
    //   console.log('event3 수신 : ', arg);
    // });
    // service.addedSubscribeEx('event1', (arg) => {
    //   console.log('EX: event1 수신 : ', arg);
    // });
    // service.addedSubscribeEx('event2', (arg) => {
    //   console.log('EX: event2 수신 : ', arg);
    // });
    // service.addedSubscribeEx('event3', (arg) => {
    //   console.log('EX: event3 수신 : ', arg);
    // });
    // service.addedEventSubscribe('event1', (event, arg) => {
    //   console.log(`[${event}] recved : ${JSON.stringify(arg)}}`);
    // });
    // service.addedEventSubscribe('event2', (event, arg) => {
    //   console.log(`[${event}] recved : ${JSON.stringify(arg)}}`);
    // });
    // service.addedEventSubscribe('event3', (event, arg) => {
    //   console.log(`=== ${this.service.getHello()}`);
    //   console.log(`[${event}] recved : ${JSON.stringify(arg)}}`);
    //   console.log(`=== ${arg.fn()}`);
    // });
    // eventSubscribeHandler.addedEvent(
    //   'event1',
    //   'NULL',
    //   (event: string, data: any, argument: any) => {
    //     console.log(
    //       `[${event}] recved : ${JSON.stringify(argument)}}, ${data}`,
    //     );
    //   },
    // );
    // eventSubscribeHandler.addedEvent(
    //   'event2',
    //   'NULL',
    //   this.__eventSubscribeFunction,
    // );
    // eventSubscribeHandler.addedEvent(
    //   'event3',
    //   this.service.getWorld,
    //   (event: string, data: any, argument: any) => {
    //     console.log(`=== ${this.service.getHello()}`);
    //     console.log(
    //       `[${event}] recved : ${JSON.stringify(argument, null, 2)}}, ${data}`,
    //     );
    //     console.log(`=== ${argument.fn()}`);
    //     console.log(`=== ${data()}`);
    //   },
    // );

    eventSubscribeHandler.addedEvent(
      'event1',
      null,
      this.__eventSubscribeHandlerFunction,
    );

    eventSubscribeHandler.addedEvent(
      'event2',
      null,
      this.__eventSubscribeHandlerFunction,
    );

    eventSubscribeHandler.addedEvent(
      'event3',
      this.service.getWorld,
      (event: string, data: any, argument: any) => {
        console.log(`=== ${this.service.getHello()}`);
        console.log(
          `[${event}] recved : ${JSON.stringify(argument, null, 2)}}, ${data}`,
        );
        console.log(`=== ${argument.fn()}`);
        console.log(`=== ${data()}`);
      },
    );

    // --------------------------------------------------------

    eventSubscriber.subscribeEvent(
      'ex-event1',
      null,
      0,
      this.__eventSubscribeFunction,
    );

    eventSubscriber.subscribeEvent(
      'ex-event2',
      null,
      0,
      this.__eventSubscribeFunction,
    );

    eventSubscriber.subscribeEvent(
      'ex-event3',
      this.service.getWorld,
      10,
      this.__eventSubscribeFunction,
    );
  }

  __eventSubscribeHandlerFunction(
    event: string,
    data: any,
    argument: any,
  ): boolean {
    // this.service.getWorld(); 접근 안됨
    console.log(data);

    console.log(
      `[${event}] recved: argument[${JSON.stringify(argument, null, 2)}}]`,
    );

    // console.log(`===[data] ${data?.service?.getHello()}`);
    // console.log(`===[data] ${data?.service?.getWorld()}`);

    // console.log(`===[argument] ${argument?.service?.getHello()}`);
    // console.log(`===[argument] ${argument?.service?.getWorld()}`);

    console.log(`<=====`);

    return true;
  }

  // event: 이벤트명
  // data: 이벤트 데이터
  // argument: 이벤트 수신시 추가로 전달받은 데이터
  __eventSubscribeFunction(
    num: number,
    event: string,
    data: any,
    argument: any,
  ): boolean {
    // this.service.getWorld(); 접근 안됨

    console.log(`[${num}]=====> `);

    console.log(data);

    argument.num = num;

    console.log(
      `[${event}] recved: argument[${JSON.stringify(argument, null, 2)}}]`,
    );

    console.log(
      `[${event}] recved: func[${argument.fn ? argument.fn(argument.name) : 'null'}]`,
    );

    console.log(`[${num}]<=====`);

    return true;
  }

  // __deco(event: string, data: any, argument: any): any {
  //   console.log(`=== ${this.service.getHello()}`);
  //   console.log(
  //     `[${event}] recved : ${JSON.stringify(argument, null, 2)}}, ${data}`,
  //   );
  //   console.log(`=== ${argument.fn()}`);
  //   console.log(`=== ${data()}`);
  // }

  @Get(':message')
  getHello(@Param('message') message: string): any {
    const data = { name: message, number: `id-${Date.now()}` };

    this.service.publishMessage('ex-event1', data);

    return data; // this.appService.getHello();
  }

  @Get('event1/:message')
  getEvent1(@Param('message') message: string): any {
    const data = { name: message, number: `id-${Date.now()}` };

    // this.service.publishMessage('event1', data);
    // this.service.publishMessageEx('event1', data);
    // this.service.publishEventSubscribe('event1', data);

    // this.eventSubscribeHandler.publishEvent('event1', data);

    this.eventSubscriber.publishEvent('ex-event1', data);

    return data; // this.appService.getHello();
  }

  @Get('event2/:message')
  getEvent2(@Param('message') message: string): any {
    const data = {
      name: message,
      number: `id-${Date.now()}`,
      service: this.service,
      fn: this.service.getFuntion,
    };

    // this.service.publishMessage('event2', data);
    // this.service.publishMessageEx('event2', data);
    // this.service.publishEventSubscribe('event2', data);

    // this.eventSubscribeHandler.publishEvent('event2', data);

    this.eventSubscriber.publishEvent('ex-event2', data);

    return data; // this.appService.getHello();
  }

  @Get('event3/:message')
  getEvent3(@Param('message') message: string): any {
    const data = {
      num: 0,
      name: message,
      number: `id-${Date.now()}`,
      fn: this.service.getFuntion,
    };

    // this.service.publishMessage('event3', data);
    // this.service.publishMessageEx('event3', data);
    // this.service.publishEventSubscribe('event3', data);

    // this.eventSubscribeHandler.publishEvent('event3', data);

    this.eventSubscriber.publishEvent('ex-event3', data);

    // console.log(this.getStackInfo(0));
    // console.log(this.getStackInfo(1));
    // console.log(this.getStackInfo(2));

    // console.log(this.getStackTrace_01());
    console.log(this.getStackTrace_02(0));
    console.log(this.getStackTrace_02(1));
    console.log(this.getStackTrace_02(2));

    // console.log(this.__debug_info());

    this.__test_info();

    return data; // this.appService.getHello();
  }

  getStackInfo(stackIndex) {
    // get call stack, and analyze it
    // get all file, method, and line numbers
    const stacklist = new Error().stack.split('\n').slice(3);

    // let stacklist;

    // try {
    //   throw new Error('');
    // } catch (error) {
    //   stacklist = error.stack.split('\n').slice(3);
    // }

    // stack trace format:
    // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
    // do not remove the regex expresses to outside of this method (due to a BUG in node.js)
    const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
    const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

    const s = stacklist[stackIndex] || stacklist[0];
    const sp = stackReg.exec(s) || stackReg2.exec(s);

    if (sp && sp.length === 5) {
      return {
        method: sp[1],
        relativePath: path.relative(PROJECT_ROOT, sp[2]),
        line: sp[3],
        pos: sp[4],
        file: path.basename(sp[2]),
        stack: stacklist.join('\n'),
      };
    }
  }

  getStackTrace_01() {
    // let stack: any;

    // try {
    //   throw new Error('');
    // } catch (error) {
    //   stack = error.stack || '';
    // }

    const stack = new Error().stack || '';

    const stackList = stack.split('\n').map(function (line) {
      return line.trim();
    });

    return stackList.splice(stackList[0] == 'Error' ? 2 : 1);
  }

  getStackTrace_02(stackIndex) {
    //let stack;

    // try {
    //   throw new Error('');
    // } catch (error) {
    //   stack = error.stack || '';
    // }

    // const stacklist = new Error().stack.split('\n').slice(3);

    const stack = new Error().stack || '';

    const stackReg1 = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
    const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

    const stackList = stack.split('\n').map(function (line) {
      // return line.trim().exec(line) || line.trim().exec(line);
      return line.trim();
    });

    // stack = stack.split('\n').map(function (line) {
    //   return line.trim();
    // });

    // return stack.splice(stack[0] == 'Error' ? 2 : 1);
    // const stack__ = stack.splice(stack[0] == 'Error' ? 2 : 1);

    const stackObj = stackList.map(function (line) {
      const regStack = stackReg1.exec(line) || stackReg2.exec(line);
      if (regStack && regStack.length === 5) {
        const ret = {
          method: regStack[1],
          relativePath: path.relative(PROJECT_ROOT, regStack[2]),
          line: regStack[3],
          pos: regStack[4],
          file: path.basename(regStack[2]),
          stack: stackList.join('\n'),
        };

        return ret;
      }
    });

    return stackObj[stackIndex];

    // const s = stackList[stackIndex] || stackList[0];
    // const sp = stackReg.exec(s) || stackReg2.exec(s);

    // if (sp && sp.length === 5) {
    //   return {
    //     method: sp[1],
    //     relativePath: path.relative(PROJECT_ROOT, sp[2]),
    //     line: sp[3],
    //     pos: sp[4],
    //     file: path.basename(sp[2]),
    //     stack: stackList.join('\n'),
    //   };
    // }
  }

  __test_info() {
    console.log(this.getStackTrace());
  }

  getStackTrace(num = 2) {
    // const e = new Error();
    // const regex = /\((.*):(\d+):(\d+)\)$/
    // const match = regex.exec(e.stack.split("\n")[num]);
    // const filepath = match[1];
    // const fileName = path.basename(filepath);
    // const line = match[2];
    // const column = match[3];

    // return `(${fileName}:${line}:${column})`;
    // return {
    //     filepath,
    //     fileName,
    //     line,
    //     column,
    //     str: `${getTime()} - ${fileName}:${line}:${column}`
    // };

    try {
      const frame = new Error().stack.split('\n')[num];
      const match = /\((.*):(\d+):(\d+)\)$/.exec(frame);

      const functionName = frame.split(' ')[5];
      const filename = match[1].replace(/^.*[\\\/]/, '').split('?')[0];

      const lineNumber = match[2];
      const columnNumber = match[3];

      return {
        message: 'success',
        function_name: functionName,
        file_name: filename,
        line_number: lineNumber,
        column_number: columnNumber,
      };
    } catch (err) {
      return {
        message: err,
        function_name: '',
        file_name: '',
        line_number: 0,
        column_number: 0,
      };
    }
  }

  // // stackFN()  = the immediate caller to stackFN
  // // stackFN(0) = the immediate caller to stackFN
  // // stackFN(1) = the caller to stackFN's caller
  // // stackFN(2) = and so on
  // // eg console.log(stackFN(),JSON.stringify(arguments),"called by",stackFN(1),"returns",retval);
  // stackFN(n) {
  //   let r = n ? n : 0,
  //     f = arguments.callee,
  //     avail = typeof f === 'function',
  //     s2,
  //     s = avail ? false : new Error().stack;
  //   if (s) {
  //     var tl = function (x) {
  //         s = s.substr(s.indexOf(x) + x.length);
  //       },
  //       tr = function (x) {
  //         s = s.substr(0, s.indexOf(x) - x.length);
  //       };
  //     while (r-- >= 0) {
  //       tl(')');
  //     }
  //     tl(' at ');
  //     tr('(');
  //     return s;
  //   } else {
  //     if (!avail) return null;
  //     s = 'f = arguments.callee';
  //     while (r >= 0) {
  //       s += '.caller';
  //       r--;
  //     }
  //     eval(s);
  //     return f.toString().split('(')[0].trim().split(' ')[1];
  //   }
  // }
  // // same as stackFN() but returns an array so you can work iterate or whatever.
  // stackArray() {
  //   var res = [],
  //     f = arguments.callee,
  //     avail = typeof f === 'function',
  //     s2,
  //     s = avail ? false : new Error().stack;
  //   if (s) {
  //     var tl = function (x) {
  //         s = s.substr(s.indexOf(x) + x.length);
  //       },
  //       tr = function (x) {
  //         s = s.substr(0, s.indexOf(x) - x.length);
  //       };
  //     while (s.indexOf(')') >= 0) {
  //       tl(')');
  //       s2 = '' + s;
  //       tl(' at ');
  //       tr('(');
  //       res.push(s);
  //       s = '' + s2;
  //     }
  //   } else {
  //     if (!avail) return null;
  //     s = 'f = arguments.callee.caller';
  //     eval(s);
  //     while (f) {
  //       res.push(f.toString().split('(')[0].trim().split(' ')[1]);
  //       s += '.caller';
  //       eval(s);
  //     }
  //   }
  //   return res;
  // }
}
