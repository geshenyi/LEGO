package com.ccorp.poc.lego.model;

import com.ccorp.poc.lego.controller.TestController;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by ssge on 2015/10/23.
 */
@Component
public class BuildRequestProcessor implements Processor {

    public Processor next;

    private BuildRequest buildRequest;

    public Processor getNext() {
        return next;
    }

    public void setNext(Processor next) {
        this.next = next;
    }

    @Override
    public void populateParameters(Map params) {
        TestController.atmosphereResource.getBroadcaster().broadcast("Populate parameters for " + this.getClass().getName());
        buildRequest = new BuildRequest();
        buildRequest.setName((String) params.get("name"));
        BuildRequest.Params params1 = new BuildRequest.Params();
        params1.setEndpoint((String) ((Map) params.get("params")).get("endpoint"));
        params1.setMethod((String) ((Map) params.get("params")).get("method"));
        List<BuildRequest.Header> headers = new ArrayList<>();
        ArrayList<Map<String, String>> headerArr = (ArrayList<Map<String, String>>) ((Map) params.get("params")).get("header");
        headerArr.stream().forEach(header -> {
            headers.add(new BuildRequest.Header(header.get("name"), header.get("value")));
        });
        params1.setHeader(headers);
        buildRequest.setParams(params1);
    }

    @Override
    public void process(Object previousResult) {
        TestController.atmosphereResource.getBroadcaster().broadcast("<b>Start Process of " + this.getClass().getName() + "</b>");
        HttpClient httpClient = HttpClients.createDefault();
        TestController.atmosphereResource.getBroadcaster().broadcast("Http Client Created");
        HttpGet httpGet = new HttpGet(buildRequest.getParams().getEndpoint());
        TestController.atmosphereResource.getBroadcaster().broadcast("Http Get Created");
        try {
            TestController.atmosphereResource.getBroadcaster().broadcast("About to send request");
            CloseableHttpResponse response = (CloseableHttpResponse) httpClient.execute(httpGet);
            TestController.atmosphereResource.getBroadcaster().broadcast("Got response <b>" + response.getStatusLine().getStatusCode() + "</b>");
            if (this.next != null) {
                TestController.atmosphereResource.getBroadcaster().broadcast("Pass to next processor");
                this.next.process(response);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void setNextProcessor(Processor p) {
        this.next = p;
    }


    public BuildRequest getBuildRequest() {
        return buildRequest;
    }

    public void setBuildRequest(BuildRequest buildRequest) {
        this.buildRequest = buildRequest;
    }
}
