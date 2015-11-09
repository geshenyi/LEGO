package com.ccorp.poc.lego.testplan;

import com.ccorp.poc.lego.controller.TestController;
import com.ebay.maui.controller.TestPlan;
import org.testng.annotations.Test;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.FileNotFoundException;
import java.util.List;
import java.util.Map;

/**
 * Test Performer Page, Venue Page, Artist Page, Team Page, Grouping Page and
 * Category Page
 * 
 * @author yutu
 * @version 1.0
 * @since 7/15/2015
 */
public class WebsiteTestPlan extends TestPlan {

    @Test
    public void testWebsite() throws FileNotFoundException, ScriptException, NoSuchMethodException {
//        try {
//            HomePage homePage = new HomePage().setUrl(HomePage.PAGE_URL).get();
//            homePage.globalHeader.myHub.simulateClick();
//            Time.$wait(10);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
        List<Map> testMapList = TestController.scripts.get();
        ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");
        String toExecuted = "";
        for(Map eachMap : testMapList){
            toExecuted += (String)((Map)eachMap.get("params")).get("script");
        }
        engine.eval(toExecuted);
//        engine.eval(new FileReader("script.js"));
//        Invocable invocable = (Invocable)engine;
//        Object result = invocable.invokeFunction("runScript", this);
    }

}