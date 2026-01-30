---
title: JAXB使用文档
date: 2026-01-30 15:30:00
categories:
  - 技术文档
tags:
  - Java
  - JAXB
  - XML
description: JAXB（Java Architecture for XML Binding）使用指南
excerpt: |
  本文介绍了JAXB（Java Architecture for XML Binding）的使用方法，包括Maven依赖配置、从XSD生成Java类、XML序列化与反序列化、DOM Transformer格式化以及处理自闭合标签等技术要点。
---
---

# JAXB使用文档

## 1. 导入依赖与设置JAXB代码生成插件

```xml
<!-- JAXB API -->
<dependency>
    <groupId>jakarta.xml.bind</groupId>
    <artifactId>jakarta.xml.bind-api</artifactId>
    <version>4.0.0</version>
</dependency>

<!-- JAXB 运行时实现 -->
<dependency>
    <groupId>com.sun.xml.bind</groupId>
    <artifactId>jaxb-impl</artifactId>
    <version>4.0.0</version>
    <scope>runtime</scope>
</dependency>

<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
        
        <plugin>
            <groupId>org.jvnet.jaxb</groupId>
            <artifactId>jaxb-maven-plugin</artifactId>
            <version>4.0.8</version>
            <executions>
                <execution>
                    <id>generate-from-xsd-first</id>
                    <goals>
                        <goal>generate</goal>
                    </goals>
                    <configuration>
                        <schemaDirectory>src/main/resources/multimodal-transport-import-message</schemaDirectory>
                        <strict>false</strict>
                        <schemaIncludes>
                            <include>08.1_多式联运_到货装载申请.xsd</include>
                        </schemaIncludes>
                        <generatePackage>com.jaxb.schemaFirst</generatePackage>
                        <generateDirectory>${project.basedir}/src/main/java</generateDirectory>
                    </configuration>
                </execution>
                <execution>
                    <id>generate-from-xsd-second</id>
                    <goals>
                        <goal>generate</goal>
                    </goals>
                    <configuration>
                        <schemaDirectory>src/main/resources/multimodal-transport-import-message</schemaDirectory>
                        <strict>false</strict>
                        <schemaIncludes>
                            <include>03.1_多式联运_主申报单申请.xsd</include>
                        </schemaIncludes>
                        <generatePackage>com.jaxb.schemaSecond</generatePackage>
                        <generateDirectory>${project.basedir}/src/main/java</generateDirectory>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

## 2. 将XSD转化为Java类

```powershell
set MAVEN_OPTS=-Djdk.xml.maxOccurLimit=100000 -Djdk.xml.totalEntitySizeLimit=0
mvn clean generate-sources -X
```

## 3. 创建目标类的实例并转化为XML

```java
ObjectFactory factory = new ObjectFactory();
Signature signature = factory.createSignature();

JAXBContext context = JAXBContext.newInstance(Signature.class);
Marshaller marshaller = context.createMarshaller();
marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
marshaller.setProperty(Marshaller.JAXB_FRAGMENT, true);
marshaller.setProperty(Marshaller.JAXB_ENCODING, "UTF-8");

File outputFile = new File("First.xml");
marshaller.marshal(signature, outputFile);
```

## 4. 使用DOM Transformer格式化XML

```java
JAXBContext jaxbContext = JAXBContext.newInstance(Signature.class);
Marshaller marshaller = jaxbContext.createMarshaller();

DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
DocumentBuilder db = dbf.newDocumentBuilder();
Document doc = db.newDocument();
marshaller.marshal(signature, doc);

TransformerFactory tf = TransformerFactory.newInstance();
Transformer transformer = tf.newTransformer();
transformer.setOutputProperty(OutputKeys.INDENT, "yes");
transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
transformer.setOutputProperty(OutputKeys.STANDALONE, "yes");

try {
    transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");
} catch (IllegalArgumentException e) {
    try {
        transformer.setOutputProperty("indent-amount", "4");
    } catch (IllegalArgumentException e2) {}
}

StringWriter writer = new StringWriter();
transformer.transform(new DOMSource(doc), new StreamResult(writer));
String resultString = writer.toString();
```

## 5. 处理自闭合标签问题

```java
private static String replaceAllSelfClosingTags(String xml) {
    Pattern pattern = Pattern.compile("<([\\w:-]+)(\\s[^>]*)?\\s*/?>");
    StringBuilder result = new StringBuilder();
    int lastIndex = 0;
    java.util.regex.Matcher matcher = pattern.matcher(xml);
    
    while (matcher.find()) {
        String fullMatch = matcher.group(0);
        String tagName = matcher.group(1);
        String attributes = matcher.group(2) != null ? matcher.group(2) : "";
        
        if (fullMatch.trim().endsWith("/>")) {
            String replacement = "<" + tagName + attributes + "></" + tagName + ">";
            result.append(xml, lastIndex, matcher.start());
            result.append(replacement);
            lastIndex = matcher.end();
        }
    }
    result.append(xml, lastIndex, xml.length());
    return result.toString();
}
```
