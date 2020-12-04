package com.esese.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {

    public enum dataType{
        paiFang,aoChang,yingDing,laoTu,wanLin,laoZhaiShe
    }

    @Id
    @Column(name="id")
    @GeneratedValue
    private int id;

    @Column(name="username")
    private String username;

    @Column(name="password")
    private String password;

    /**
     * 数据结构顺序：老斋舍 万林 老图书馆 樱顶 奥场 牌坊
     * data&amp;(0x1&lt;&lt;n)
     * */
    @Column(name="data")
    private int data;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getData() {
        return data;
    }

    public String dataToString(){
        StringBuilder sb=new StringBuilder("{");
        for(dataType type:dataType.values())
            sb.append('"').append(type.name()).append('"').append(':').append(isComplete(type)).append(',');
        sb.deleteCharAt(sb.length()-1);
        sb.append('}');
        return sb.toString();
    }

    public void setData(int data) {
        this.data = data;
    }

    public boolean isComplete(dataType type){
        return (data&(0x1<<type.ordinal()))!=0;
    }

    public void setComplete(dataType type){
        data=data|(0x1<<type.ordinal());
    }
}
