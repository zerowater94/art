<%
System.out.println(request.getParameter("aaa"));
System.out.println(request.getParameter("pq_rpp"));
System.out.println(request.getParameter("pq_curpage"));
String currPage = request.getParameter("pq_curpage");
System.out.println(currPage);
%>
 {"curPage":"<%= currPage %>","totalRecords":40,"data":[[11,"General Electric","157,153.0","16,353.0"],[12,"Total","152,360.7","15,250.0"],[13,"ING Group","138,235.3","8,958.9"],[14,"Citigroup","131,045.0","24,589.0"],[15,"AXA","129,839.2","5,186.5"],[16,"Allianz","121,406.0","5,442.4"],[17,"Volkswagen","118,376.6","1,391.7"],[18,"Fortis","112,351.4","4,896.3"],[19,"CrÃ©dit Agricole","110,764.6","7,434.3"],[20,"American Intl. Group","108,905.0","10,477.0"]]}

