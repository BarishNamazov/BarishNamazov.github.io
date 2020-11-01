var newRow = "<table class=\"centerTableItems gradesTable\"><tbody><tr><td><button type=\"button\" class=\"btn btn-danger rowDeleter\" style=\"background-color:transparent\" aria-label=\"Remove\"> <i class=\"far fa-trash-alt\" style=\"color: red\" aria-hidden=\"true\"></i> </button></td><td><input type=\"text\" class=\"gradeName\" value=\"Midterm X\" autocomplete=\"off\"></td><td><input type=\"text\" class=\"gradeValue\"></td><td><input type=\"text\" class=\"gradeWeight percentIcon\"></td></tr></tbody></table>\n ";

var newSection = "<div class=\"col-lg-6 d-flex justify-content-center\"><table class=\"gradePanel\"> <tbody> <tr class=\"centerTableItems\"> <td> <table class = \"centerTableItems\"> <tbody> <tr class=\"optionalWeighting centerTableItems\"> <td> <div class=\"totalWeightIs\" style=\"display: none;\"><strong>Total weight of this section is:</strong> <input type=\"text\" style=\"display: inline; width: 65px; text-align: center;\" class=\"totalWeightIsThisInput percentIcon\"></div> <div class=\"eachWeightIs\" style=\"display: none;\"><strong>Weight of each <span class=\"nameOfSection\">Midterm</span> is: </strong> <input type=\"text\" style=\"display: inline; width: 65px; text-align: center;\" class=\"eachWeightIsThisInput percentIcon\"></div> </td> </tr> <tr class=\"rowHeader\"> <td></td> <td class=\"tableHeader tableName\"><strong>Midterm</strong></td> <td class=\"tableHeader\"><strong>Grade</strong></td> <td class=\"tableHeader\"> <div class=\"btn-group dropright\"> <button type=\"button\" class=\"btn btn-secondary dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" style=\"color: black; background-color: transparent;\"><strong>Weight</strong> </button> <div class=\"dropdown-menu\" style=\"\"> <div class=\"dropdown-header\">If all grades have same weight, choose one of below. </div> <button class=\"dropdown-item eachWeightIsThis\" type=\"button\">Enter weight that will be used for each grade</button> <button class=\"dropdown-item totalWeightIsThis\" type=\"button\">Enter total weight</button> <button class=\"dropdown-item backToManual\" type=\"button\">Back to manual</button> </div> </div> </td> </tr> <tr class=\"gradesRow\"> <td><button type=\"button\" class=\"btn btn-danger rowDeleter\" style=\"background-color:transparent; border:none\" aria-label=\"Remove\"> <i class=\"far fa-trash-alt\" style=\"color: transparent\" aria-hidden=\"true\"></i> </button></td><td><input type=\"text\" class=\"gradeName\" value=\"Midterm 1\" autocomplete=\"off\"></td> <td><input type=\"text\" class=\"gradeValue\" placeholder=\"100\"></td> <td><input type=\"text\" class=\"gradeWeight percentIcon\" placeholder=\"20\"></td> </tr> </tbody> </table> <div class=\"moreRows\"></div>  <div class=\"btn-group\" style=\"display: block\"> <button type=\"button\" class=\"btn btn-primary rowAdder\">add a row</button><!-- --><button type=\"button\" class=\"btn btn-primary dropdown-toggle dropdown-toggle-split\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"></button> </button> <div class=\"dropdown-menu\"> <button class=\"dropdown-item addMoreThanOneRow\">Enter the number of rows you want to add</button> </div> </div>  <div class=\"gradeBar\"> <h3> Weighted <span class=\"nameOfSection\">Midterm</span> average: <span class=\"sectionAverage\">0</span>% <br> Contribution to the total grade: <span class=\"sectionContribution\">0</span>% <div class=\"failSafe\"> You might have some errors while entering the grades and weights as numbers. Those grades are ignored. </div> </h3> </div>  </td> </tr> </tbody> </table> </div>";

$(".resetter").on("click", function() {
    location.reload();
});
$("input").not(".gradeName").val(null);
$(".gradeName").val("Midterm 1");
$(".failSafe").hide();

if (!String.prototype.splice) {
    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

var sectionCount = 1;

function rowAdder() {
    var panel = $(this).parents(".gradePanel");
    var idx = panel.find("table").length + 1;
    var namePanel = panel.find(".tableName").text();
    var editedRow = newRow.replace("Midterm X", namePanel + " " + idx);
    panel.find(".moreRows").before(editedRow);
    $(".gradeValue").on("input", updateSectionGrade);
    $(".gradeWeight").on("input", updateSectionGrade);
    $(".gradeValue").on("input", calculateTotalGrade);
    $(".gradeWeight").on("input", calculateTotalGrade);
    if (panel.find(".totalWeightIs").css("display") == "block") {
        panel.find(".gradeWeight").val((panel.find(".totalWeightIsThisInput").val()/panel.find(".gradeWeight").length).toFixed(2));
    }
    if (panel.find(".eachWeightIs").css("display") == "block") {
        panel.find(".gradeWeight").val(panel.find(".eachWeightIsThisInput").val());
    }
    $(".rowDeleter").on("click", rowDeleter);
}
function rowDeleter() {
    // console.log($(this).parents(".gradesRow"));
    var panel = $(this).parents(".gradePanel");
    $(this).parents(".gradesTable").hide();
    $(".gradeValue").on("input", updateSectionGrade);
    $(".gradeWeight").on("input", updateSectionGrade);
    $(".gradeValue").on("input", calculateTotalGrade);
    $(".gradeWeight").on("input", calculateTotalGrade);
    if (panel.find(".totalWeightIs").css("display") == "block") {
        panel.find(".gradeWeight").val((panel.find(".totalWeightIsThisInput").val()/panel.find(".gradeWeight:visible").length).toFixed(2));
    }
    if (panel.find(".eachWeightIs").css("display") == "block") {
        panel.find(".gradeWeight").val(panel.find(".eachWeightIsThisInput").val());
    }
    calculateTotalGrade();
    updateSectionGrade(panel, true);
}
function rowAddClicker() {
    var cnt = prompt("How many rows you want to add? (notice that there is one already)");
    for (var i = 0; i < cnt; i++) {
        $(this).parents(".gradePanel").find(".rowAdder").click();
    }
}
$(".rowDeleter").on("click", rowDeleter);
$(".rowAdder").on("click", rowAdder);
$(".addMoreThanOneRow").on("click", rowAddClicker);
function sectionAdder(dir) {
    var x = (typeof dir == "string") ? $(dir) : $(this);
    var sectionInputName = $(".sectionName").val();
    if (!sectionInputName) return;
    var editedSection = newSection.replaceAll("Midterm", sectionInputName);
    $(".moreSections").before(editedSection);
    $(".rowAdder").eq(sectionCount++).on("click", rowAdder);
    $(".sectionName").val(null);
    doUpdatesForNewSection();
    $(".addMoreThanOneRow").on("click", rowAddClicker);
}


$(".sectionAdder").on("click", sectionAdder);
$(".sectionName").on("keypress", function(e) {
    if (e.which == 13) {
        sectionAdder(".sectionName");
    }
})

function updateSectionGrade(sectionInherit, someFlag) {
    var section = $(this).parents(".gradePanel");
    console.log(sectionInherit);
    if (someFlag) {
        section = $(sectionInherit);
    }
    var grades = section.find(".gradeValue:visible"),
        weights = section.find(".gradeWeight:visible");
    var contribution = 0.0,
        failSafe = 0,
        weightSum = 0.0,
        sectionAverage = 0.0;
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
    var grades = $(document).find(".gradeValue:visible"),
        weights = $(document).find(".gradeWeight:visible");
    var totalGrade = 0.0,
        weightSum = 0.0,
        onlyKnownGrades = 0.0;
    for (var i = 0; i < grades.length; i++) {
        if (Number(grades[i].value) && Number(weights[i].value)) {
            weightSum += Number(weights[i].value);
            totalGrade += Number(grades[i].value) * Number(weights[i].value) / 100.0;
        }
    }
    for (var i = 0; i < grades.length; i++) {
        if (Number(grades[i].value) && Number(weights[i].value)) {
            onlyKnownGrades += Number(grades[i].value) * Number(weights[i].value) / weightSum;
        }
    }
    $("#totalGrade").find(".totalGrade").text(totalGrade.toFixed(2));
    $("#totalGrade").find(".onlyKnownGrades").text(onlyKnownGrades.toFixed(2));
}

function doUpdatesForNewSection() {
    // $(".addMoreThanOneRow").on("click", rowAddClicker);
    $(".gradeValue").on("input", updateSectionGrade);
    $(".gradeWeight").on("input", updateSectionGrade);
    $(".gradeValue").on("input", calculateTotalGrade);
    $(".gradeWeight").on("input", calculateTotalGrade);
    $(".eachWeightIsThis").on("click", function() {
        $(this).parents(".gradePanel").find(".totalWeightIs").hide();
        $(this).parents(".gradePanel").find(".eachWeightIs").show();
        $(this).parents(".gradePanel").find(".gradeWeight").val(null);
        $(this).parents(".gradePanel").find(".totalWeightIsThisInput").val(null);
        $(this).parents(".gradePanel").find(".eachWeightIsThisInput").val(null);
    });
    
    $(".totalWeightIsThis").on("click", function() {
        $(this).parents(".gradePanel").find(".totalWeightIs").show();
        $(this).parents(".gradePanel").find(".eachWeightIs").hide();
        $(this).parents(".gradePanel").find(".gradeWeight").val(null);
        $(this).parents(".gradePanel").find(".totalWeightIsThisInput").val(null);
        $(this).parents(".gradePanel").find(".eachWeightIsThisInput").val(null);
    });
    $(".backToManual").on("click", function() {
        $(this).parents(".gradePanel").find(".totalWeightIs").hide();
        $(this).parents(".gradePanel").find(".eachWeightIs").hide();
        $(this).parents(".gradePanel").find(".gradeWeight").val(null);
        $(this).parents(".gradePanel").find(".totalWeightIsThisInput").val(null);
        $(this).parents(".gradePanel").find(".eachWeightIsThisInput").val(null);
    });
    $(".totalWeightIsThisInput").on("input", function() {
        $(this).parents(".gradePanel").find(".gradeWeight").val(($(this).val()/$(this).parents(".gradePanel").find(".gradeWeight").length).toFixed(2));
    });
    $(".eachWeightIsThisInput").on("input", function() {
        $(this).parents(".gradePanel").find(".gradeWeight").val($(this).val());
    });
}
doUpdatesForNewSection();