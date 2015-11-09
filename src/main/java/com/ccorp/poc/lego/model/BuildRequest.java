package com.ccorp.poc.lego.model;

import java.util.List;

/**
 * Created by ssge on 2015/10/23.
 */
public class BuildRequest {
    private String name;
    private Params params;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Params getParams() {
        return params;
    }

    public void setParams(Params params) {
        this.params = params;
    }

    public static class Params {
        private String endpoint;
        private String method;
        private List<Header> header;

        public String getEndpoint() {
            return endpoint;
        }

        public void setEndpoint(String endpoint) {
            this.endpoint = endpoint;
        }

        public String getMethod() {
            return method;
        }

        public void setMethod(String method) {
            this.method = method;
        }

        public List<Header> getHeader() {
            return header;
        }

        public void setHeader(List<Header> header) {
            this.header = header;
        }
    }

    public static class Header {
        private String name;
        private String value;

        public Header(){

        }

        public Header(String name, String value){
            this.name = name;
            this.value = value;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }
}


