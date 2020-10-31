var newRow = "<table><tbody><tr><td><input type=\"text\" class=\"gradeName\" value=\"Midterm X\" autocomplete=\"off\"></td><td><input type=\"text\" class=\"gradeValue\"></td><td><input type=\"text\" class=\"gradeWeight percentIcon\"></td></tr></tbody></table>\n ";

var newSection = "<table class=\"gradePanel\"> <tbody> <tr> <td> <table> <tbody> <tr class=\"rowHeader\"> <td class=\"tableHeader tableName\"><strong>Midterm</strong></td> <td class=\"tableHeader\"><strong>Grade</strong></td> <td class=\"tableHeader\"><strong>Weight</strong></td> </tr> <tr> <td><input type=\"text\" class=\"gradeName\" value=\"Midterm 1\" autocomplete=\"off\"></td> <td><input type=\"text\" class=\"gradeValue\" placeholder=\"100\"></td> <td><input type=\"text\" class=\"gradeWeight percentIcon\" placeholder=\"20\"></td> </tr> </tbody> </table> <div class=\"moreRows\"></div> <button class=\"btn btn-primary rowAdder\">add more row!</button> </td> </tr> </tbody> </table>";

$("input").attr("autocomplete", "off");

if (!String.prototype.splice) {
  String.prototype.splice = function(start, delCount, newSubStr) {
      return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
  };
}

var sectionCount = 1;

function rowAdder(){
  var idx = $(this).parents(".gradePanel").find("table").length + 1;
  var namePanel = $(this).parents(".gradePanel").find(".tableName").text();
  var editedRow = newRow.replace("Midterm X", namePanel + " " + idx);
  $(this).parents(".gradePanel").find(".moreRows").before(editedRow);
}
$(".rowAdder").on("click", rowAdder);

function sectionAdder(dir){
  var x = (typeof dir == "string") ? $(dir) : $(this);
  var sectionInputName = $(".sectionName").val();
  if (!sectionInputName) return;
  var editedSection = newSection.replaceAll("Midterm", sectionInputName);
  
  $(".moreSections").before(editedSection);

  $(".rowAdder").eq(sectionCount++).on("click", rowAdder);

  $(".sectionName").val(null);
}


$(".sectionAdder").on("click", sectionAdder);
$(".sectionName").on("keypress", function(e) {
  if (e.which == 13) {
    sectionAdder(".sectionName");
  }
})

function updateSectionGrade() {
  var section = $(this).parents(".gradePanel");
  var grades = section.find(".gradeValue"), weights = section.find(".gradeValue");
  var contribution = 0.0;
  for (var i = 0; i < grades.length; i++) {
    console.log(grades[i]);
    console.log(weights[i]);
    contribution += Number(grades[i].value) * Number(weights[i].value) / 100.0;
  }
  section.find(".sectionAverage").text(contribution);
}

$(".gradeValue").change(updateSectionGrade);
$(".gradeWeight").change(updateSectionGrade);