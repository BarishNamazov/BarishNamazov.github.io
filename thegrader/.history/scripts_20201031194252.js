var newRow = "<table><tbody><tr><td><input type=\"text\" class=\"gradeName\" value=\"Midterm X\" autocomplete=\"off\"></td><td><input type=\"text\" class=\"gradeValue\"></td><td><input type=\"text\" class=\"gradeWeight percentIcon\"></td></tr></tbody></table>\n ";

var newSection = "<table class=\"gradePanel\"> <tbody> <tr> <td> <table> <tbody> <tr class=\"rowHeader\"> <td class=\"tableHeader tableName\"><strong>Midterm</strong></td> <td class=\"tableHeader\"><strong>Grade</strong></td> <td class=\"tableHeader\"><strong>Weight</strong></td> </tr> <tr> <td><input type=\"text\" class=\"gradeName\" value=\"Midterm 1\" autocomplete=\"off\"></td> <td><input type=\"text\" class=\"gradeValue\" placeholder=\"100\"></td> <td><input type=\"text\" class=\"gradeWeight percentIcon\" placeholder=\"20\"></td> </tr> </tbody> </table> <div class=\"moreRows\"></div> <button class=\"btn btn-primary rowAdder\">add more row!</button>  <div class=\"gradeBar\"> <h3> Weighted <span class=\"nameOfSection\">Midterm</span> average: <span class=\"sectionAverage\">100</span>% <br> Contribution to the total grade: <span class=\"sectionContribution\">20</span>% <div class=\"failSafe\"> You might have some errors while entering the grades and weights as numbers. Those grades are ignored. </div> </h3> </div>  </td> </tr> </tbody> </table>";

$(".resetter").on("click", function(){
  location.reload(true);
});
$(".failSafe").hide();

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
  $(".gradeValue").change(updateSectionGrade);
  $(".gradeWeight").change(updateSectionGrade);
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
  $(".gradeValue").change(updateSectionGrade);
  $(".gradeWeight").change(updateSectionGrade);  
}


$(".sectionAdder").on("click", sectionAdder);
$(".sectionName").on("keypress", function(e) {
  if (e.which == 13) {
    sectionAdder(".sectionName");
  }
})

function updateSectionGrade() {
  var section = $(this).parents(".gradePanel");
  var grades = section.find(".gradeValue"), weights = section.find(".gradeWeight");
  var contribution = 0.0, failSafe = 0, weightSum = 0.0, sectionAverage = 0.0;
  section.find("input").attr("placeholder", "");
  for (var i = 0; i < grades.length; i++) {
    if (Number(grades[i].value) && Number(weights[i].value)) {
      weightSum += Number(weights[i].value);
      contribution += Number(grades[i].value) * Number(weights[i].value) / 100.0;
    } else if (isNaN(Number(grades[i].value)) || isNaN(Number(weights[i].value))) {
      failSafe = 1;
    }
  }
  for (var i = 0; i < grades.length; i++) {
    if (Number(grades[i].value) && Number(weights[i].value)) {
      sectionAverage += Number(grades[i].value) * Number(weights[i].value) / weightSum;
    }
  }
  if (failSafe) {
    section.find(".failSafe").show();
  } else {
    section.find(".failSafe").hide();
  }
  section.find(".sectionContribution").text(contribution.toFixed(2));
  section.find(".sectionAverage").text(sectionAverage.toFixed(2));
}
function calculateTotalGrade() {
  var grades = $(".gradeValue"), weights = $(".gradeWeight");
  var contribution = 0.0, failSafe = 0, weightSum = 0.0, sectionAverage = 0.0;
  for (var i = 0; i < grades.length; i++) {
    if (Number(grades[i].value) && Number(weights[i].value)) {
      weightSum += Number(weights[i].value);
      contribution += Number(grades[i].value) * Number(weights[i].value) / 100.0;
    } else if (isNaN(Number(grades[i].value)) || isNaN(Number(weights[i].value))) {
      failSafe = 1;
    }
  }
  for (var i = 0; i < grades.length; i++) {
    if (Number(grades[i].value) && Number(weights[i].value)) {
      sectionAverage += Number(grades[i].value) * Number(weights[i].value) / weightSum;
    }
  }}
$(".gradeValue").change(updateSectionGrade);
$(".gradeWeight").change(updateSectionGrade);