import { test } from 'qunit';
import moduleForAcceptance from 'super-rentals/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | list rentals');

test('should redirect to rentals route', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/rentals');
  });
});

test('should list available rentals', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('.listing').length, 3);
  });
});

test('should link to information about the company', function(assert) {
  visit('/');
  click('a:contains("About")');

  andThen(function() {
    assert.equal(currentURL(), '/about');
  });
});

test('should link to contact information', function(assert) {
  visit('/');
  click('a:contains("Contact")');

  andThen(function() {
    assert.equal(currentURL(), '/contact');
  });
});

test('should filter the list of rentals by city', function(assert) {
  visit('/');
  fillIn('.list-filter input', 'seattle');
  keyEvent('.list-filter-input', 'keyup', 69);

  andThen(function() {
    assert.equal(find('.listing').length, 1);
    assert.equal(find('.listing .location:contains("Seattle")').length, 1);
  });
});

test('should show details for a specific rental', function(assert) {
  visit('/');
  click('a:contains("Grand Old Mansion")');

  andThen(function() {
    assert.equal(currentURL(), '/rentals/grand-old-mansion');
    assert.equal(find('.show-listing h2').text(), 'Grand Old Mansion');
    assert.equal(find('.description').length, 1);
  });
});
