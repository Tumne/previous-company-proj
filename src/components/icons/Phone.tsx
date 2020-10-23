import React from 'react';

const PhoneIcon = ({ fill = 'currentColor', ...props }) => (
  <svg width={14} height={14} viewBox="0 0 14 14" {...props}>
    <path
      d="M12.953 3.22a2.9 2.9 0 0 1 0 4.096l-2.769 2.77-2.867 2.867a2.875 2.875 0 0 1-2.048.847c-.774 0-1.5-.3-2.047-.847L2.03 11.76a1.167 1.167 0 0 1-.345-.831c0-.315.123-.61.345-.832l2.092-2.093a1.177 1.177 0 0 1 1.663 0l.25.25 2.22-2.22-.25-.25a1.178 1.178 0 0 1 0-1.664l2.093-2.093a1.17 1.17 0 0 1 .831-.344c.314 0 .61.122.832.344l1.192 1.192zm-.563 3.532a2.102 2.102 0 0 0 0-2.97l-1.193-1.191a.377.377 0 0 0-.536 0L8.57 4.684a.38.38 0 0 0 0 .536l.53.531a.399.399 0 0 1 0 .564L6.318 9.099a.398.398 0 0 1-.564 0l-.531-.532a.38.38 0 0 0-.536 0l-2.093 2.094a.371.371 0 0 0-.11.268c0 .102.037.195.11.267l1.192 1.193c.396.396.923.614 1.484.614.562 0 1.089-.218 1.484-.613l2.868-2.868 2.769-2.77zM5.796 3.9a.398.398 0 0 1-.563.564c-.148-.147-.446-.097-.653.109a.639.639 0 0 0-.19.383c-.006.063-.003.182.082.267a.398.398 0 1 1-.563.564 1.125 1.125 0 0 1-.313-.902c.029-.322.178-.633.42-.876h.001c.52-.52 1.318-.569 1.779-.109zm-.518-1.208c-.513-.24-1.328.028-1.94.639v.001c-.6.6-.872 1.406-.647 1.918a.399.399 0 0 1-.73.32c-.363-.827-.036-1.952.813-2.802.855-.854 2.024-1.182 2.843-.797a.398.398 0 0 1-.339.721zm-3.157-.571c-.905.905-1.335 2.11-1.022 2.865a.398.398 0 1 1-.736.305c-.22-.532-.217-1.178.01-1.867.22-.665.629-1.31 1.184-1.866l.002-.002C2.124.99 2.781.578 3.457.36 4.15.139 4.82.147 5.346.381a.399.399 0 0 1-.325.728c-.756-.337-1.975.088-2.899 1.01l-.001.002z"
      fill={fill}
      fillRule="nonzero"
    />
  </svg>
);

export default PhoneIcon;
