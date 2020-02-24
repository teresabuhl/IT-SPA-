import $ from "jquery";

export const signup = () => {
	const fragment = $(new DocumentFragment());

	fragment
		.append("<h2>Oops</h2>")
		.append("<p>Użytkowniku! Co żeś uczynił?!</p>");

	return Promise.resolve(fragment);
	// 	let form = $(`<form>
	//   <div class="form-group">
	//     <label for="exampleInputEmail1">Email address</label>
	//     <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
	//     <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
	//   </div>
	//   <div class="form-group">
	//     <label for="exampleInputPassword1">Password</label>
	//     <input type="password" class="form-control" id="exampleInputPassword1">
	//   </div>
	// </form>
	//   `);
	// 	let btn = $(`<button type="submit" class="btn btn-primary">
	// 		Submit
	//   </button>`);
	// 	$(form).append(btn);
	// 	fragment.append(form);
};
