$(function () {
    'use strict';

    function configureCopyButton(id) {
        var copyButton = $('#' + id + '-button');
        copyButton.popover({ trigger: 'manual' });

        copyButton.click(function () {
            var text = $('#' + id + '-text').text().trim();
            window.nuget.copyTextToClipboard(text, copyButton);
            copyButton.popover('show');
            setTimeout(function () {
                copyButton.popover('destroy');
            }, 1000);
        });
    }    

    $clamp(document.getElementById("readme-clamped"),
        { clamp: 10 });
    var readmeClamped = $("#readme-clamped");
    $("#show-readme-original").click(function () {
        readmeClamped.collapse("toggle");
    });
   
    readmeClamped.on('hide.bs.collapse', function (e) {
        e.stopPropagation();
    });
    readmeClamped.on('show.bs.collapse', function (e) {
        e.stopPropagation();
    });

    window.nuget.configureExpander(
        "readme-original",
        "CalculatorAddition",
        "Show less",
        "CalculatorSubtract",
        "Show more"); 

    window.nuget.configureExpanderHeading(
        "readme-container");   

    window.nuget.configureExpanderHeading("dependency-groups");
    window.nuget.configureExpanderHeading("version-history");
    window.nuget.configureExpander(
        "hidden-versions",
        "CalculatorAddition",
        "Show less",
        "CalculatorSubtract",
        "Show more");    

    for (var i in packageManagers)
    {
        configureCopyButton(packageManagers[i]);
    }

    // Enable the undo edit link.
    $("#undo-pending-edits").click(function (e) {
        e.preventDefault();
        $(this).closest('form').submit();
    })

    // Emit a Google Analytics event when the user expands or collapses the Dependencies section.
    if (window.nuget.isGaAvailable()) {
        $("#dependency-groups").on('hide.bs.collapse show.bs.collapse', function (e) {
            ga('send', 'event', 'dependencies', e.type);
        });
    }
});