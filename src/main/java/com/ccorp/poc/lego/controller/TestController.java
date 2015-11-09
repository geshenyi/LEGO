package com.ccorp.poc.lego.controller;

import com.ccorp.poc.lego.model.Processor;
import edu.emory.mathcs.backport.java.util.Arrays;
import org.atmosphere.cpr.AtmosphereRequest;
import org.atmosphere.cpr.AtmosphereResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.testng.TestNG;
import org.testng.xml.XmlSuite;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by ssge on 2015/10/22.
 */
@RestController
@RequestMapping("/engine")
public class TestController {

    public static ThreadLocal<List<Map>> scripts = new ThreadLocal<>();

    public static AtmosphereResource atmosphereResource = null;

    ArrayList<HttpSession> subscribers = new ArrayList<>();
    @Autowired
    private ApplicationContext appContext;


    @RequestMapping(value="/test",method = RequestMethod.POST)
    public ResponseEntity<String> test(AtmosphereResource atmosphereResource,@RequestBody List<Map> testMapList) throws InvocationTargetException, IllegalAccessException, ClassNotFoundException, InstantiationException {
//        atmosphereResource.getBroadcaster().broadcast("haha");
        TestController.atmosphereResource = atmosphereResource;
        Processor start = null;
        Processor previous = null;
        atmosphereResource.getBroadcaster().broadcast("<b>Start to build test chain</b>");
        for(int i=0;i<testMapList.size();i++){
            Map stepMap = testMapList.get(i);
            Processor p = (Processor) Class.forName("com.ccorp.poc.lego.model."+stepMap.get("name") + "Processor").newInstance();
            p.populateParameters(stepMap);
            if(i==0){
                start = p;
            }
            if(previous!=null){
                previous.setNextProcessor(p);
            }
            previous = p;
        }
        start.process(null);
        return new ResponseEntity<String>("done", HttpStatus.OK);
    }

    @RequestMapping(value="/test", method=RequestMethod.OPTIONS)
    public ResponseEntity<String> testOptions() {
        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    @RequestMapping(value="/testui",method = RequestMethod.POST)
    public ResponseEntity<String> testui(AtmosphereResource atmosphereResource,@RequestBody List<Map> testMapList) throws InvocationTargetException, IllegalAccessException, ClassNotFoundException, InstantiationException {
        System.out.println(testMapList);
        scripts.set(testMapList);
//        atmosphereResource.getBroadcaster().broadcast("haha");
//        TestController.atmosphereResource = atmosphereResource;
//        Processor start = null;
//        Processor previous = null;
//        atmosphereResource.getBroadcaster().broadcast("<b>Start to build test chain</b>");
//        for(int i=0;i<testMapList.size();i++){
//            Map stepMap = testMapList.get(i);
//            Processor p = (Processor) Class.forName("com.ccorp.poc.lego.model."+stepMap.get("name") + "Processor").newInstance();
//            p.populateParameters(stepMap);
//            if(i==0){
//                start = p;
//            }
//            if(previous!=null){
//                previous.setNextProcessor(p);
//            }
//            previous = p;
//        }
//        start.process(null);

        TestNG testNG = new TestNG();
        XmlSuite xmlSuite = new XmlSuite();
        testNG.setTestSuites(Arrays.asList(new String[]{this.getClass().getClassLoader().getResource("website.xml").getPath()}));
        testNG.run();
        return new ResponseEntity<String>("done", HttpStatus.OK);
    }

    @RequestMapping(value="/testui", method=RequestMethod.OPTIONS)
    public ResponseEntity<String> testuiOptions() {
        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    @RequestMapping(value="/websockets",method=RequestMethod.GET)
    @ResponseBody
    public void websockets(AtmosphereResource atmosphereResource, HttpSession session) throws IOException {
        AtmosphereRequest atmosphereRequest = atmosphereResource.getRequest();

        System.out.println(atmosphereRequest.getHeader("negotiating"));
        if(atmosphereRequest.getHeader("negotiating") == null) {
            atmosphereResource.resumeOnBroadcast(atmosphereResource.transport() == AtmosphereResource.TRANSPORT.LONG_POLLING).suspend();
        } else {
            atmosphereResource.getResponse().getWriter().write("OK");
        }

        subscribers.add(session);

        System.out.println("Subscribers: " + subscribers.size());

        for(HttpSession httpSession : subscribers) {
            System.out.println(httpSession);
        }
    }

    @RequestMapping(value="/websockets", method=RequestMethod.OPTIONS)
    public ResponseEntity<String> websocketsOptions() {
        return new ResponseEntity<String>("success", HttpStatus.OK);
    }
    public static void main(String[] args) {

    }
}
