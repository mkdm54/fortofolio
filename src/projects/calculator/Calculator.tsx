import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

const Calculator = () => {
  const [currentInput, setCurrentInput] = useState<string>(""); // Angka yang sedang diketik atau hasil akhir
  const [expression, setExpression] = useState<string>(""); // Ekspresi matematika lengkap

  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const showAlertMessage = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setAlertMessage("");
    }, 3000);
  };

  const appendToDisplay = (input: string) => {
    setShowAlert(false);
    const operators = ["+", "-", "*", "/"];

    if (operators.includes(input)) {
      // Jika operator ditekan
      if (currentInput !== "") {
        // Jika ada angka yang diketik, tambahkan ke ekspresi dan kemudian operator
        setExpression((prevExpr) => prevExpr + currentInput + input);
        setCurrentInput("");
      } else if (expression !== "") {
        // Jika tidak ada angka yang diketik, tetapi ekspresi ada
        const lastCharOfExpression = expression.slice(-1);
        if (operators.includes(lastCharOfExpression)) {
          // Jika karakter terakhir adalah operator, ganti operator tersebut
          setExpression((prevExpr) => prevExpr.slice(0, -1) + input);
        } else if (expression.endsWith(" =")) {
          // Jika ekspresi berakhir dengan "=", berarti perhitungan baru akan dimulai
          // dengan hasil sebelumnya sebagai angka pertama
          setExpression(currentInput + input); // currentInput seharusnya berisi hasil sebelumnya
          setCurrentInput("");
        } else {
          // Jika ekspresi memiliki angka tetapi tidak ada operator di akhir, tambahkan operator baru
          setExpression((prevExpr) => prevExpr + input);
        }
      } else {
        // Jika currentInput dan expression kosong, tidak bisa memulai dengan operator
        showAlertMessage("Masukkan angka terlebih dahulu");
      }
    } else if (input === ".") {
      // Tangani titik desimal
      if (!currentInput.includes(".")) {
        setCurrentInput((prev) => prev + input);
      }
    } else {
      // Ini adalah angka
      // Jika ekspresi berakhir dengan "=", berarti perhitungan baru akan dimulai
      if (expression.endsWith(" =")) {
        setExpression("");
        setCurrentInput(input);
      } else {
        setCurrentInput((prev) => prev + input);
      }
    }
  };

  const clearDisplay = () => {
    setCurrentInput("");
    setExpression("");
    setAlertMessage("");
    setShowAlert(false);
  };

  const calculate = () => {
    setShowAlert(false);

    let fullEvalString = expression;
    if (currentInput !== "") {
      fullEvalString += currentInput;
    }

    if (fullEvalString.trim() === "") {
      showAlertMessage("Masukkan angka terlebih dahulu");
      return;
    }

    const operators = ["+", "-", "*", "/"];
    const lastCharOfFullEvalString = fullEvalString.slice(-1);

    if (operators.includes(lastCharOfFullEvalString)) {
      showAlertMessage("Input tidak valid!");
      return;
    }

    try {
      // eslint-disable-next-line no-eval
      const result = eval(fullEvalString);
      setExpression(fullEvalString + " =");
      setCurrentInput(result.toString());
    } catch (e) {
      showAlertMessage("Input tidak valid!");
    }
  };

  const backspace = () => {
    if (currentInput !== "") {
      setCurrentInput((prev) => prev.slice(0, -1));
    } else if (expression !== "") {
      if (expression.endsWith(" =")) {
        // Jika itu hasil, bersihkan semuanya untuk memulai yang baru
        clearDisplay();
      } else {
        const lastChar = expression.slice(-1);
        const operators = ["+", "-", "*", "/"];

        if (operators.includes(lastChar)) {
          // Jika karakter terakhir adalah operator, hapus saja dari ekspresi
          setExpression((prev) => prev.slice(0, -1));
        } else {
          // Jika karakter terakhir adalah angka, kita perlu menemukan angka terakhir dalam ekspresi
          // dan memindahkannya ke currentInput, lalu menghapusnya dari ekspresi.
          let tempExpression = expression;
          let lastNumber = "";
          // Ekstrak angka terakhir dari ekspresi
          while (
            tempExpression.length > 0 &&
            !operators.includes(tempExpression.slice(-1))
          ) {
            lastNumber = tempExpression.slice(-1) + lastNumber;
            tempExpression = tempExpression.slice(0, -1);
          }
          // Sekarang, lastNumber berisi angka terakhir penuh (misalnya, "45" dari "123+45")
          // tempExpression berisi sisanya (misalnya, "123+")

          // Jika lastNumber tidak kosong, hapus digit terakhirnya dan atur ke currentInput
          if (lastNumber.length > 0) {
            setCurrentInput(lastNumber.slice(0, -1));
          }
          setExpression(tempExpression); // Atur ekspresi ke bagian sebelum angka terakhir
        }
      }
    }
  };

  const toggleSign = () => {
    if (currentInput !== "") {
      setCurrentInput(String(-1 * parseFloat(currentInput)));
    }
  };

  const calculatePercentage = () => {
    if (currentInput !== "") {
      setCurrentInput(String(parseFloat(currentInput) / 100));
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen w-full overflow-hidden">
      {/* Alert Message */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 mt-5 px-4 py-2 rounded-lg border transition-all duration-500 ease-in-out
          ${
            showAlert
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-20"
          }
          ${
            alertMessage.includes("valid")
              ? "bg-red-100 text-red-700 border-red-200"
              : "bg-yellow-100 text-yellow-700 border-yellow-200"
          }
        `}
      >
        <h3>{alertMessage}</h3>
      </div>

      <div
        className="relative bg-gradient-to-bl from-calc-deep-blue to-calc-purple rounded-2xl p-4 w-full max-w-xs overflow-hidden
                   shadow-[0_4px_10px_rgba(0,0,0,0.5),_0_0_20px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.1)]"
      >
        {/* Display */}
        <div className="mb-2">
          <input
            id="history-display"
            className="w-full p-1 text-xl text-right bg-white text-gray-600 border-none outline-none rounded-t-md font-sans"
            type="text"
            value={expression}
            readOnly
          />
          <input
            id="display-the-result"
            className="w-full p-1 text-4xl text-right bg-white text-black border-none outline-none rounded-b-md font-sans"
            type="text"
            value={currentInput}
            readOnly
          />
        </div>
        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          <Button
            onClick={clearDisplay}
            className="col-span-1 bg-white text-calc-red text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100"
          >
            AC
          </Button>
          <Button
            onClick={backspace}
            className="col-span-1 bg-white text-calc-red text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100"
          >
            <Delete className="w-6 h-6" />
          </Button>
          <Button
            onClick={calculatePercentage}
            className="col-span-1 bg-calc-cyan text-black text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100 hover:bg-calc-cyan/80"
          >
            %
          </Button>
          <Button
            onClick={() => appendToDisplay("/")}
            className="col-span-1 bg-calc-cyan text-black text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100 hover:bg-calc-cyan/80"
          >
            ÷
          </Button>

          <Button
            onClick={() => appendToDisplay("7")}
            className="col-span-1 bg-white text-black text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100 hover:bg-gray-100"
          >
            7
          </Button>
          <Button
            onClick={() => appendToDisplay("8")}
            className="col-span-1 bg-white text-black text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100 hover:bg-gray-100"
          >
            8
          </Button>
          <Button
            onClick={() => appendToDisplay("9")}
            className="col-span-1 bg-white text-black text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100 hover:bg-gray-100"
          >
            9
          </Button>
          <Button
            onClick={() => appendToDisplay("*")}
            className="col-span-1 bg-calc-cyan text-black text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100 hover:bg-calc-cyan/80"
          >
            ×
          </Button>

          <Button
            onClick={() => appendToDisplay("4")}
            className="col-span-1 bg-white text-black text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100 hover:bg-gray-100"
          >
            4
          </Button>
          <Button
            onClick={() => appendToDisplay("5")}
            className="col-span-1 bg-white text-black text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100 hover:bg-gray-100"
          >
            5
          </Button>
          <Button
            onClick={() => appendToDisplay("6")}
            className="col-span-1 bg-white text-black text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100 hover:bg-gray-100"
          >
            6
          </Button>
          <Button
            onClick={() => appendToDisplay("-")}
            className="col-span-1 bg-calc-cyan text-black text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100 hover:bg-calc-cyan/80"
          >
            -
          </Button>

          <Button
            onClick={() => appendToDisplay("1")}
            className="col-span-1 bg-white text-black text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100 hover:bg-gray-100"
          >
            1
          </Button>
          <Button
            onClick={() => appendToDisplay("2")}
            className="col-span-1 bg-white text-black text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100 hover:bg-gray-100"
          >
            2
          </Button>
          <Button
            onClick={() => appendToDisplay("3")}
            className="col-span-1 bg-white text-black text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100 hover:bg-gray-100"
          >
            3
          </Button>
          <Button
            onClick={() => appendToDisplay("+")}
            className="col-span-1 bg-calc-cyan text-black text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100 hover:bg-calc-cyan/80"
          >
            +
          </Button>

          <Button
            onClick={toggleSign}
            className="col-span-1 bg-white text-black text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100 hover:bg-gray-100"
          >
            ±
          </Button>
          <Button
            onClick={() => appendToDisplay("0")}
            className="col-span-1 bg-white text-black text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100 hover:bg-gray-100"
          >
            0
          </Button>
          <Button
            onClick={() => appendToDisplay(".")}
            className="col-span-1 bg-white text-black text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100 hover:bg-gray-100"
          >
            .
          </Button>
          <Button
            onClick={calculate}
            className="col-span-1 bg-calc-orange text-white text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center
                       shadow-[0_8px_0_black] active:shadow-[0_4px_0_black] active:translate-y-1 transition-all duration-100 hover:bg-calc-orange/80"
          >
            =
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
