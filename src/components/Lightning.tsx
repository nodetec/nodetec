import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { requestInvoice } from "lnurl-pay";
import type { Satoshis } from "lnurl-pay/dist/types/types";
import {
  CheckCircleIcon,
  BoltIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useStore } from "@nanostores/react";
import { connected } from "../store/lightning";
import { LN_URL_OR_ADDRESS } from "../settings";

const PRESET_AMOUNTS = [
  { value: 1000 as Satoshis, label: "1k" },
  { value: 5000 as Satoshis, label: "5k" },
  { value: 10000 as Satoshis, label: "10k" },
  { value: 25000 as Satoshis, label: "25k" },
];

export default function Lightning() {
  let [isOpen, setIsOpen] = useState(false);
  const defaultTipAmount = 100 as Satoshis;
  const [isTipSuccessOpen, setIsTipSuccessOpen] = useState(false);
  const [tipInputValue, setTipInputValue] =
    useState<Satoshis>(defaultTipAmount);
  const [tipMessage, setTipMessage] = useState<string>();
  const [paymentHash, setPaymentHash] = useState();
  const [tippedAmount, setTippedAmount] = useState<any>();
  const $connected = useStore(connected);

  useEffect(() => {
    setTipMessage("");
    setTipInputValue(defaultTipAmount);
  }, [isOpen]);

  const connectHandler = async () => {
    try {
      // @ts-ignore
      const enabled = await window.webln.enable();
      if (enabled) {
        connected.set("true");
      }
    } catch (e) {
      connected.set("false");
    }
  };

  useEffect(() => {
    if ($connected === "true") {
      connectHandler();
    }
  }, []);

  const openTipModal = () => {
    setIsOpen(true);
  };

  const handleSendTip = async (e: any) => {
    e.preventDefault();
    // @ts-ignore
    if (typeof window.webln !== "undefined") {
      // TODO: put address in settings
      const lnUrlOrAddress = LN_URL_OR_ADDRESS;

      const { invoice /* , params, successAction, validatePreimage  */ } =
        await requestInvoice({
          lnUrlOrAddress,
          tokens: tipInputValue, // satoshis
          comment: tipMessage,
        });
      try {
        // @ts-ignore
        const result = await webln.sendPayment(invoice);
        setTippedAmount(tipInputValue);
        setPaymentHash(result.paymentHash);
      } catch (e) {
        console.log("Tip Error:", e);
      }
    }
    setIsOpen(!isOpen);
    setIsTipSuccessOpen(!isTipSuccessOpen);
  };

  return (
    <>
      <button
        className="hidden sm:block outline-none focus:ring-0"
        onClick={$connected === "true" ? openTipModal : connectHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="icon-bolt md:w-8 md:h-8 w-6 h-6"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            className="fill-purple-500 dark:fill-orange-600"
          />
          <path
            className="fill-white dark:fill-slate-900"
            // className={$connected === "true" ? "fill-yellow-400" : "fill-white"}
            d="M14 10h2a1 1 0 0 1 .81 1.58l-5 7A1 1 0 0 1 10 18v-4H8a1 1 0 0 1-.81-1.58l5-7A1 1 0 0 1 14 6v4z"
          />
        </svg>
      </button>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          className="fixed z-50"
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              aria-hidden="true"
            />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="fixed transform -translate-y-1/4 w-full max-w-sm md:max-w-md bg-slate-50 dark:bg-slate-800 rounded-lg shadow-xl p-6 text-base font-semibold text-slate-900 dark:text-slate-100">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute z-10 top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 hover:dark:text-slate-300"
                >
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="flex text-xl items-center justify-center">
                  <Dialog.Title>Lightning Tip</Dialog.Title>
                </div>

                <form onSubmit={handleSendTip}>
                  <div className="mt-8">
                    <label
                      htmlFor="amount"
                      className="block text-sm font-semibold"
                    >
                      Amount
                    </label>
                    <div className="mt-3 ">
                      <input
                        type="number"
                        value={tipInputValue}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const tipAmount = parseInt(inputValue) as Satoshis;
                          setTipInputValue(tipAmount);
                        }}
                        placeholder="Enter amount in sats"
                        required
                        min={1}
                        className="block w-full sm:py-3 shadow-sm sm:text-sm focus:ring-purple-300 focus:border-purple-300 border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-800 dark:focus:ring-orange-400 dark:focus:border-orange-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />

                      <span className="absolute transform -translate-y-9 right-10">
                        sats
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-3 mt-8">
                    {PRESET_AMOUNTS.map((amount, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="w-full flex justify-center items-center gap-2 py-2 px-4 border rounded-md shadow-md text-sm font-semibold hover:font-bold hover:text-white border-purple-600 hover:bg-purple-500 dark:border-orange-400 dark:hover:bg-orange-500 focus:outline-none"
                        onClick={() => setTipInputValue(amount.value)}
                      >
                        {amount.label}
                        <BoltIcon className="h-3 w-3" aria-hidden="true" />
                      </button>
                    ))}
                  </div>

                  <div className="mt-8">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold"
                    >
                      Message
                    </label>
                    <div className="mt-3">
                      <input
                        type="text"
                        name="message"
                        id="message"
                        placeholder="Optional"
                        className="block w-full sm:py-3 shadow-sm sm:text-sm focus:ring-purple-300 focus:border-purple-300 border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:focus:ring-orange-400 dark:focus:border-orange-400 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="mt-8 mb-2">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 dark:bg-orange-500 dark:hover:bg-orange-600 focus:outline-none"
                    >
                      Send Tip
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={isTipSuccessOpen} as={Fragment}>
        <Dialog
          className="fixed z-50"
          open={isTipSuccessOpen}
          onClose={() => setIsTipSuccessOpen(false)}
        >
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="fixed transform -translate-y-1/4 w-full max-w-sm md:max-w-md bg-slate-50 dark:bg-slate-800 rounded-lg shadow-xl p-6 text-base font-semibold">
                <button
                  onClick={() => setIsTipSuccessOpen(false)}
                  className="outline-none absolute z-10 top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 hover:dark:text-slate-300"
                >
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="flex pb-4 items-center justify-center text-xl">
                  <Dialog.Title>Success</Dialog.Title>
                </div>
                <h4 className="flex items-center justify-center gap-2 text-lg bg-green-100 dark:bg-green-400/25 text-green-300 text-center py-4 rounded-md">
                  <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />

                  {`You sent ${tippedAmount} sats!`}
                </h4>
                <h5 className="text overflow-x-scroll rounded-md text-center py-4">
                  <div className="cursor-text bg-slate-100 dark:bg-slate-700 rounded-md flex justify-start items-center w-full">
                    <div className="py-2 pl-2 mr-2 whitespace-nowrap">
                      Payment Hash:
                    </div>
                    <div className="py-4 pr-4 whitespace-nowrap bg-slate-100 dark:bg-slate-700 rounded-md">
                      {paymentHash}
                    </div>
                  </div>
                </h5>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
