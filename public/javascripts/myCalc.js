/**
 * Created by jdrilla on 3/30/17.
 */

var myCalc = angular.module('myCalc', []);

myCalc.controller('myCtrl', function ($scope) {
    "use strict";
    //Bound to the output display
    $scope.output = 0;

    //Evaluates when to start a new number and when to concatenate in the display
    $scope.newNumber = true;

    //Holds the pending Operation
    $scope.pendingOp = null;

    //Bound to the view to indicate the current operation
    $scope.opToken  = "";

    //Holds a running total as numbers are added/subtracted
    $scope.runningTotal = null;

    // Holds the number value of the string in the display output
    $scope.pendingVal = null;

    //Tells calulate what to do when the equals button is click
    $scope.lastOp = null;

    //Constants

    const ADD = "adding";
    const SUBTRACT = "subtracting";
    const  MULTIPLY = "multiplying";
    const DIVISION = "dividing";
    const ADD_TOKEN = "+";
    const  SUBTRACT_TOKEN = "-";
    const MULTIPLY_TOKEN = "*";
    const DIVISION_TOKEN = "/";

    //Updates the display when a number is clicked
    $scope.updateOutput = function(btn){
        if($scope.output === "0" || $scope.newNumber){
            $scope.output = btn;
            $scope.newNumber = false;
        } else {
            $scope.output += String(btn);
        }
        $scope.pendingVal = toNumber($scope.output);
    };

    //Runs every time the add button is clicked
    $scope.add = function(){
        if($scope.pendingVal){
            if($scope.runningTotal && $scope.pendingOp === ADD){
                $scope.runningTotal += $scope.pendingVal;
            } else if($scope.runningTotal && $scope.pendingOp === SUBTRACT) {
                 $scope.runningTotal -= $scope.pendingVal;
            }else if($scope.runningTotal && $scope.pendingOp === MULTIPLY){
                $scope.runningTotal *= $scope.pendingVal;
            } else if($scope.runningTotal && $scope.pendingOp === DIVISION){
                $scope.runningTotal /= $scope.pendingVal;
            }else {
               $scope.runningTotal = $scope.pendingVal;
            }
        }

        setOperationToken(ADD);
        setOutput(String($scope.runningTotal));
        $scope.pendingOp = ADD;
        $scope.newNumber = true;
        $scope.pendingVal = null;
    };

    //Runs when the subtract button is clicked
    $scope.subtract = function(){
        if($scope.pendingVal){
            if($scope.runningTotal && ($scope.pendingOp === SUBTRACT)){
                $scope.runningTotal -= $scope.pendingVal;
            } else if($scope.runningTotal && $scope.pendingOp === ADD){
                $scope.runningTotal += $scope.pendingVal;
            } else if($scope.runningTotal && $scope.pendingOp === MULTIPLY){
                $scope.runningTotal *= $scope.pendingVal;
            } else if($scope.runningTotal && $scope.pendingOp === DIVISION){
                $scope.runningTotal /= $scope.pendingVal;
            } else{
                $scope.runningTotal = $scope.pendingVal;
            }
        }

        setOperationToken(SUBTRACT);
        setOutput(String($scope.runningTotal));
        $scope.pendingOp = SUBTRACT;
        $scope.newNumber = true;
        $scope.pendingVal = null;
    };

    $scope.multiply = function () {
        if($scope.pendingVal){
            if($scope.runningTotal && ($scope.pendingOp === MULTIPLY)){
                $scope.runningTotal *= $scope.pendingVal;
            } else if($scope.runningTotal && $scope.pendingOp === ADD){
                $scope.runningTotal += $scope.pendingVal;
            } else if($scope.runningTotal && $scope.pendingOp === SUBTRACT){
                $scope.runningTotal -= $scope.pendingVal;
            } else if($scope.runningTotal && $scope.pendingOp === DIVISION){
                $scope.runningTotal /= $scope.pendingVal;
            } else{
                $scope.runningTotal = $scope.pendingVal;
            }
        }

        setOperationToken(MULTIPLY);
        setOutput(String($scope.runningTotal));
        $scope.pendingOp = MULTIPLY;
        $scope.newNumber = true;
        $scope.pendingVal = null;
    };

    $scope.division = function () {
        if($scope.pendingVal){
            if($scope.runningTotal && ($scope.pendingOp === DIVISION)){
                $scope.runningTotal /= $scope.pendingVal;
            } else if($scope.runningTotal && $scope.pendingOp === ADD){
                $scope.runningTotal += $scope.pendingVal;
            } else if($scope.runningTotal && $scope.pendingOp === SUBTRACT){
                $scope.runningTotal -= $scope.pendingVal;
            } else if($scope.runningTotal && $scope.pendingOp === MULTIPLY){
                $scope.runningTotal *= $scope.pendingVal;
            } else{
                $scope.runningTotal = $scope.pendingVal;
            }
        }

        setOperationToken(DIVISION);
        setOutput(String($scope.runningTotal));
        $scope.pendingOp = DIVISION;
        $scope.newNumber = true;
        $scope.pendingVal = null;
    };



    //Runs when the equals button is clicked
    $scope.calculate = function () {
        if(!$scope.newNumber){
            $scope.pendingVal = toNumber($scope.output);
            $scope.lastVal = $scope.pendingVal;
        }
        if($scope.pendingOp == ADD){
            $scope.runningTotal += $scope.pendingVal;
            $scope.lastOp = ADD;
        }else if($scope.pendingOp === SUBTRACT){
            $scope.runningTotal -= $scope.pendingVal;
            $scope.lastOp = SUBTRACT;
        } else if($scope.pendingOp === MULTIPLY){
            $scope.runningTotal *= $scope.pendingVal;
            $scope.lastOp = MULTIPLY;
        } else if($scope.pendingOp === DIVISION){
            $scope.runningTotal /= $scope.pendingVal;
            $scope.lastOp = DIVISION;
        } else {
            if($scope.lastOp){
                if($scope.lastOp === ADD){
                    if($scope.runningTotal){
                        $scope.runningTotal += $scope.lastVal;
                    }else{
                        $scope.runningTotal = 0;
                    }
                } else if($scope.lastOp === SUBTRACT){
                    if($scope.runningTotal){
                        $scope.runningTotal -= $scope.lastVal;
                    } else {
                        $scope.runningTotal = 0;
                    }
                } else if($scope.lastOp === MULTIPLY){
                    if($scope.runningTotal){
                        $scope.runningTotal *= $scope.lastVal;
                    } else{
                        $scope.runningTotal = 0;
                    }
                } else if($scope.lastOp === DIVISION){
                     if($scope.runningTotal){
                         $scope.runningTotal /= $scope.lastVal;
                     } else {
                         $scope.runningTotal = 0;
                     }

                }

            }
        }

        setOutput($scope.runningTotal);
        setOperationToken();
        $scope.pendingOp = null;
        //console.log("The calc Pending OP", $scope.pendingOp);
        $scope.pendingVal = null;

    };


     //Initializes the appropriate values when the clear button is clicked.
    $scope.clear = function() {
        $scope.runningTotal = null;
        $scope.pendingValue = null;
        $scope.pendingOperation = null;
        setOutput("0");
    };

    //Updates the display output and reset newNumber
   var setOutput = function(outputString) {
        $scope.output = outputString;
        $scope.newNumber = true;
    };

    //Sets the operation token to let the user know the pending Operation
    var setOperationToken = function(operation) {
        if(operation == ADD) {
            $scope.operationToken = ADD_TOKEN;
        } else if (operation == SUBTRACT) {
            $scope.operationToken = SUBTRACT_TOKEN;
        } else if(operation == MULTIPLY){
             $scope.operationToken = MULTIPLY_TOKEN;
        } else if(operation == DIVISION){
            $scope.operationToken = DIVISION_TOKEN;
        } else {
            $scope.operationToken = "";
        }
    };

   var toNumber = function (numberString) {
        var result = 0;
        if(numberString){
            result = numberString*1;
        }

        return result;
    };


});