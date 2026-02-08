import "jsvectormap/dist/jsvectormap.min.css";
import "dropzone/dist/dropzone.css";
import "flatpickr/dist/flatpickr.min.css";
import "../css/style.css";

import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import Dropzone from "dropzone";

import chart01 from "./components/charts/chart-01";
import chart02 from "./components/charts/chart-02";
import chart03 from "./components/charts/chart-03";
import map01 from "./components/map-01";
import "./components/calendar-init.js";
import "./components/image-resize";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
window.Quill = Quill;
import Swal from 'sweetalert2';
window.Swal = Swal;
import Sortable from "sortablejs";
window.Sortable = Sortable;
import printJS from "print-js";
window.printJS = printJS;
import TomSelect from "tom-select";
import "tom-select/dist/css/tom-select.default.css";
window.TomSelect = TomSelect;

import "flatpickr-jalali-support/dist/flatpickr.min.css";

import flatpickr from "flatpickr-jalali-support";
import { Persian } from "flatpickr-jalali-support/dist/l10n/fa";


flatpickr.localize(Persian);


window.flatpickr = flatpickr;

Alpine.plugin(persist);
window.Alpine = Alpine;
Alpine.start();


// Init flatpickr
flatpickr(".datepicker", {
  mode: "range",
  static: true,
....
    ....
    
    .....