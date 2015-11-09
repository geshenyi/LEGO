/**
 * Created by ssge on 2015/10/27.
 */

function runScript(testPlan) {
    testPlan.setCookie();
    var SurveyPage = Java.type('');
    SurveyPage.setUrl(SurveyPage.PAGE_URL).get();
    SurveyPage.disableSurveyPopup();
}

print('calling from JAVA');
print(testplan);
var HomePage = Java.type('');
var Time = Java.type('');
var homepage = new HomePage().setUrl("").get();
homepage.globalHeader.myHub.simulateClick();
Time.$wait(10);
