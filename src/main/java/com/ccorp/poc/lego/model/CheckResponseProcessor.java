package com.ccorp.poc.lego.model;

import com.ccorp.poc.lego.controller.TestController;
import org.apache.http.client.methods.CloseableHttpResponse;

import java.util.Map;

/**
 * Created by ssge on 2015/10/23.
 */
public class CheckResponseProcessor implements Processor<CloseableHttpResponse> {
    public Processor next;

    public Processor getNext() {
        return next;
    }

    public void setNext(Processor next) {
        this.next = next;
    }

    private CheckResponse checkResponse;

    @Override
    public void populateParameters(Map params) {
        TestController.atmosphereResource.getBroadcaster().broadcast("Populate parameters for " + this.getClass().getName());
        checkResponse = new CheckResponse();
        checkResponse.setName((String) params.get("name"));
        checkResponse.setLabel((String) ((Map)params.get("params")).get("label"));
        checkResponse.setValue((String) ((Map)params.get("params")).get("value"));
    }

    @Override
    public void process(CloseableHttpResponse previousResult) {
        TestController.atmosphereResource.getBroadcaster().broadcast("<b>Start Process of " + this.getClass().getName()+"</b>");
        boolean checkStatus = previousResult.getStatusLine().getStatusCode() == Integer.parseInt(checkResponse.getValue());
        TestController.atmosphereResource.getBroadcaster().broadcast("Check Result...");
        TestController.atmosphereResource.getBroadcaster().broadcast("Expected: <b>" + checkResponse.getValue() + "</b> Actual: <b>"
                + previousResult.getStatusLine().getStatusCode() + "</b> Result: " + (checkStatus?"<span style='color:green'>Pass</span>":"<span style='color:red'>Fail</span>"));
        if(this.next != null){
            this.next.process(previousResult);
        }
    }

    @Override
    public void setNextProcessor(Processor p) {

    }
}
