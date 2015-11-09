package com.ccorp.poc.lego.model;

import java.util.Map;

/**
 * Created by ssge on 2015/10/23.
 */
public interface Processor<T> {
    public void populateParameters(Map params);

    public void process(T previousResult);

    public void setNextProcessor(Processor p);
}
